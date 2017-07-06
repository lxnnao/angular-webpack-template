var path = require('path');
var webpack = require('webpack');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var ngtools = require('@ngtools/webpack');
var SharkConfig = require('./shark-deploy-conf');

module.exports = {
    entry: {
        bootstrap: [__dirname + '/src/main/webapp/bootstrap.ts', 'webpack-hot-middleware/client?reload=true'],
        polyfill: ['zone.js/dist/zone', 'reflect-metadata'],
        thirdparty: ['jquery', 'bignumber.js', 'swiper', 'fastclick']
    },
    output: {
        path: path.join(__dirname, 'build', 'client'),
        filename: 'js/[name].js',
        chunkFilename: 'js/chunk-[id].js',
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
                    name: 'images/[name].[ext]',
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
                // ExtractTextPlugin不支持热替换，开发模式不使用（https://segmentfault.com/q/1010000008716379）
                // loader: 'style-loader!css-loader?sourceMap!sass-loader?sourceMap'
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
                test: require.resolve("jquery"),
                loader: "expose-loader?$!expose-loader?jQuery"
            }, {
                test: require.resolve("bignumber.js"),
                loader: "expose-loader?BigNumber"
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
        new ProgressBarPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new DefinePlugin({
            'ENV': '"dev"'
        }),
        new ExtractTextPlugin('css/[name].css'),
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
            name: [
                'bootstrap',
                'polyfill',
                'thirdparty'
            ]
        }),
        new ngtools.AotPlugin({
            skipCodeGeneration: true,   //默认false. false：使用AoT ; true：不使用AoT 
            tsConfigPath: path.join(__dirname, 'tsconfig.json')
        }),
        new AddAssetHtmlPlugin([
            { filepath: require.resolve('./dll/angular.dll.js') },
            { filepath: require.resolve('./dll/echarts.dll.js') }
        ]),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(path.join(__dirname, 'dll/angular-manifest.json'))
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(path.join(__dirname, 'dll/echarts-manifest.json'))
        })
    ],
    devtool: 'source-map' //'cheap-module-source-map' | 'source-map'
}