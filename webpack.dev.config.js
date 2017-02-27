var path = require('path');
var webpack = require('webpack');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        bootstrap: [__dirname + '/src/main/webapp/bootstrap.ts', 'webpack-hot-middleware/client?reload=true'],
        lib: ['@angular/core', '@angular/platform-browser', '@angular/common', '@angular/router', '@angular/forms', '@angular/http'],
        polyfill: [__dirname + '/src/main/webapp/polyfill.ts']
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js',
        publicPath: 'http://support.163.com:9000/'
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: [
                    '@angularclass/hmr-loader',
                    'awesome-typescript-loader',
                    'angular-router-loader',
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
                    limit: 100
                }
            },
            {
                test: /\.scss$/,
                exclude: [
                    path.join(__dirname, 'src/main/webapp/app')
                ],
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', loader: 'css-loader!sass-loader' })
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
        new webpack.HotModuleReplacementPlugin(),
        new DefinePlugin({
            'ENV': '"dev"'
        }),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("[name].css"),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + '/src/main/webapp/index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['bootstrap', 'lib', 'polyfill']
        })
    ],
    devtool: 'source-map' //'cheap-module-source-map' | 'source-map'
}