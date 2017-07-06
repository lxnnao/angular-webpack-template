var path = require('path');
var webpack = require('webpack');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var ngtools = require('@ngtools/webpack');
var SharkConfig = require('./shark-deploy-conf');

module.exports = {
    entry: {
        bootstrap: [__dirname + '/src/main/webapp/bootstrap.ts'],
        angular: ['@angular/core', '@angular/platform-browser', '@angular/common', '@angular/router', '@angular/http', '@angular/forms'],
        polyfill: ['zone.js/dist/zone', 'reflect-metadata'],
        thirdparty: ['jquery', path.join(__dirname, 'src/main/webapp/echarts.ts'), 'bignumber.js', 'swiper', 'fastclick']
    },
    output: {
        path: path.join(__dirname, 'build', 'client'),
        filename: 'js/[name]-[chunkhash:8].js',
        chunkFilename: 'js/chunk-[id]-[chunkhash:8].js',
        publicPath: SharkConfig.contextPath + '/'
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: [
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
                    name: 'images/[name]-[hash:8].[ext]',
                    limit: 100
                }
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
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
            }, {
                test: /jquery/,
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }]
            }, {
                test: /bignumber.js/,
                use: [{
                    loader: 'expose-loader',
                    options: 'BigNumber'
                }]
            }, {
                test: require.resolve("swiper"),
                loader: "expose-loader?Swiper"
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
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
        new ExtractTextPlugin('css/[name]-[contenthash:8].css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + '/src/main/webapp/index.ejs'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Echarts: path.join(__dirname, 'src/main/webapp/echarts.ts'),
            BigNumber: 'bignumber.js',
            Swiper: 'swiper'
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