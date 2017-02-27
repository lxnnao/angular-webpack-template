如果使用 ngc-webpack 插件替换 @ngtools/webpack 插件


AoT编译
(1)在bootstrap.ts同级创建bootstrap.aot.ts文件
/******start******/
import "./styles/scss/index.scss";
import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from '../../../aot-ts/src/main/webapp/app/app.module.ngfactory';
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
/******end******/

(2)在webpack.build.config同级创建webpack.build.ngcwebpack.config.js文件
/******start******/
var path = require('path');
var webpack = require('webpack');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ngcWebpack = require('ngc-webpack');

module.exports = {
    entry: {
        bootstrap: [__dirname + '/src/main/webapp/bootstrap.aot.ts'],
        lib: ['@angular/core', '@angular/router', '@angular/platform-browser', '@angular/forms'],
        polyfill: [__dirname + '/src/main/webapp/polyfill.ts']
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name]-[hash].js',
        publicPath: 'http://support.163.com:9000/'
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: [
                    'awesome-typescript-loader',
                    'angular-router-loader?aot=true&genDir=aot-ts',
                    'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                include: path.join(__dirname, 'src/main/')
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 100,
                    name: '[name]-[hash].[ext]'
                }
            },
            {
                test: /\.scss$/,
                exclude: [
                    path.join(__dirname, 'src/main/webapp/app')
                ],
                loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader!sass-loader' })
            },
            {
                test: /\.scss$/,
                include: [
                    path.join(__dirname, 'src/main/webapp/app')
                ],
                loaders: [
                    'to-string-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new DefinePlugin({
            'ENV': '"prod"'
        }),
        new ExtractTextPlugin('[name]-[hash].css'),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + '/src/main/webapp/index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['bootstrap', 'lib', 'polyfill']
        }),
        new ngcWebpack.NgcWebpackPlugin({
            // disabled: false,   // 默认true。 false：使用AoT，需要使用bootstrap.aot.ts作为入口文件 ; true：不使用AoT，需要使用bootstrap.ts作为入口文件
            tsConfig: path.resolve(__dirname, 'tsconfig.aot.json'),
            resourceOverride: ''
        })
    ]
}
/******end******/

(3)build.js中
这行代码
var webpackconf = require('./webpack.build.config');
修改为
var webpackconf = require('./webpack.build.ngcwebpack.config');

