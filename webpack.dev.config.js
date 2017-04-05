var path = require('path');
var webpack = require('webpack');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ngtools = require('@ngtools/webpack');
var DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;
var webpackMerge = require('webpack-merge').strategy({ plugins: 'replace' });
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

var config = {
    entry: {
        polyfills: ['zone.js/dist/zone', 'reflect-metadata'],
        bootstrap: [__dirname + '/src/main/webapp/bootstrap.ts', 'webpack-hot-middleware/client'],
        vendor: ['jquery']
    },
    output: {
        path: path.join(__dirname, 'build', 'client'),
        filename: 'js/[name].js',
        chunkFilename: "js/chunk-[id].js",
        publicPath: '/',
        sourceMapFilename: '[name].map',
        library: '[name]',
        libraryTarget: 'var',
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: [{
                loader: '@angularclass/hmr-loader'
            }, {
                loader: '@ngtools/webpack'
            }]
        }, {
            test: /\.html$/,
            include: path.join(__dirname, 'src/main/'),
            use: [{
                loader: 'html-loader'
            }]
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    name: 'images/[name].[ext]',
                    limit: 100
                }
            }]
        }, {
            test: /\.scss$/,
            exclude: [
                path.join(__dirname, 'src/main/webapp/app')
            ],
            use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
        }, {
            test: /\.scss$/,
            include: [
                path.join(__dirname, 'src/main/webapp/app')
            ],
            use: [{
                loader: 'to-string-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'sass-loader'
            }]
        }, {
            test: /\.ejs$/,
            use: [{
                loader: 'ejs-loader'
            }]
        }, {
            test: /jquery/,
            use: [{
                loader: 'expose-loader',
                options: 'jQuery'
            }, {
                loader: 'expose-loader',
                options: '$'
            }]
        }]
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
        new DllBundlesPlugin({
            bundles: {
                angular: [
                    '@angular/core',
                    '@angular/platform-browser',
                    '@angular/platform-browser-dynamic',
                    '@angular/common',
                    '@angular/router',
                    '@angular/http',
                    '@angular/forms',
                    '@ntesmail/shark-angular2'
                ]
            },
            dllDir: path.join(__dirname, 'src/main/webapp/lib'),
            webpackConfig: webpackMerge(config, {
                devtool: 'cheap-module-source-map',
                plugins: []
            })
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['bootstrap', 'polyfill', 'vendor']
        }),
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + '/src/main/webapp/index.ejs'
        }),
        new AddAssetHtmlPlugin([{
            filepath: path.join(__dirname, `src/main/webapp/lib/${DllBundlesPlugin.resolveFile('angular')}`)
        }]),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new ngtools.AotPlugin({
            skipCodeGeneration: true, //默认false. false：使用AoT ; true：不使用AoT 
            tsConfigPath: path.join(__dirname, 'tsconfig.json')
        })
    ],
    devtool: 'cheap-module-source-map' //'cheap-module-source-map' | 'source-map'
};

module.exports = config;