var path = require('path');
var webpack = require('webpack');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var ngtools = require('@ngtools/webpack');

module.exports = {
    entry: {
        bootstrap: [__dirname + '/src/main/webapp/bootstrap.ts'],
        angular: ['@angular/core', '@angular/platform-browser', '@angular/common', '@angular/router', '@angular/http', '@angular/forms', '@ntesmail/shark-angular2'],
        polyfill: ['zone.js/dist/zone', 'reflect-metadata'],
        thirdparty: ['jquery', 'flatpickr', 'echarts']
    },
    output: {
        path: path.join(__dirname, 'build', 'client'),
        filename: 'js/[name]-[hash:8].js',
        chunkFilename: 'js/chunk-[id]-[hash:8].js',
        publicPath: 'http://localhost:9000/'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: '@ngtools/webpack'
            }, 
            {
                test: /\.html$/,
                loader: 'html-loader',
                include: path.join(__dirname, 'src/main/')
            }, 
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: 'images/[name]-[hash:8].[ext]',
                    limit: 100
                }
            }, 
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            }, 
            {
                test: /\.scss$/,
                exclude: [
                    path.join(__dirname, 'src/main/webapp/app')
                ],
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
            }, 
            {
                test: /\.scss$/,
                include: [
                    path.join(__dirname, 'src/main/webapp/app')
                ],
                use: [
                    'to-string-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }, 
            {
                test: /\.ejs$/,
                loader: 'ejs-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new ProgressBarPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                warnings: false
            }
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new DefinePlugin({
            'ENV': '"prod"'
        }),
        new ExtractTextPlugin('css/[name]-[hash:8].css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + '/src/main/webapp/index.ejs'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Flatpickr: 'flatpickr',
            echarts: 'echarts'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['bootstrap', 'angular', 'polyfill', 'thirdparty']
        }),
        new ngtools.AotPlugin({
            skipCodeGeneration: false,   //默认false. false：使用AoT ; true：不使用AoT 
            tsConfigPath: path.join(__dirname, 'tsconfig.json')
        })
    ]
}