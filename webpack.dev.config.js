var path = require('path');
var webpack = require('webpack');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ngtools = require('@ngtools/webpack');

module.exports = {
    entry: {
        bootstrap: [__dirname + '/src/main/webapp/bootstrap.ts', 'webpack-hot-middleware/client?reload=true'],
        angular: ['@angular/core', '@angular/platform-browser', '@angular/platform-browser-dynamic', '@angular/common', '@angular/router', '@angular/http', '@angular/forms', '@ntesmail/shark-angular2'],
        polyfill: ['zone.js/dist/zone', 'reflect-metadata'],
        jquery: ['jquery']
    },
    output: {
        path: path.join(__dirname, 'build', 'client'),
        filename: 'js/[name].js',
        chunkFilename: "js/chunk-[id].js",
        publicPath: 'http://localhost:9000/'
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: [
                    '@angularclass/hmr-loader',
                    '@ngtools/webpack'
                ]
            }, {
                test: /\.html$/,
                loader: 'html-loader',
                include: path.join(__dirname, 'src/main/')
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    name: 'images/[name].[ext]',
                    limit: 100
                }
            }, {
                test: /\.scss$/,
                exclude: [
                    path.join(__dirname, 'src/main/webapp/app')
                ],
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
            }, {
                test: /\.scss$/,
                include: [
                    path.join(__dirname, 'src/main/webapp/app')
                ],
                loaders: [
                    'to-string-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }, {
                test: /\.ejs$/,
                loader: 'ejs-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new DefinePlugin({
            'ENV': '"dev"'
        }),
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + '/src/main/webapp/index.ejs'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['bootstrap', 'angular', 'polyfill', 'jquery']
        }),
        new ngtools.AotPlugin({
            skipCodeGeneration: true,   //默认false. false：使用AoT ; true：不使用AoT 
            tsConfigPath: path.join(__dirname, 'tsconfig.json')
        })
    ],
    devtool: 'source-map' //'cheap-module-source-map' | 'source-map'
}