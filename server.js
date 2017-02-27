var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var fs = require('fs');
var path = require('path');
var express = require('express');
var openurl = require('openurl');
var argv = require('yargs').argv;
var webpackDevConfig = require('./webpack.dev.config');
var config = require('./shark-deploy-conf.json');

var compiler = webpack(webpackDevConfig);

var app = express();

app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler, {
    reload: true
}));

app.use(function (req, res, next) {
    var mockPath = path.join(__dirname, './src/test/mock');
    var reqPath = req.path;

    if (!/\.(do|json)/.test(reqPath)) {
        return next();
    }

    if (req.complete) {
        sendResponse();
    } else {
        req.on('data', function (chunk) {

        });

        req.on('end', function (chunk) {
            sendResponse();
        });
    }

    function sendResponse() {
        var mockFile = path.join(mockPath, reqPath);
        if (fs.existsSync(mockFile)) {
            res.send(fs.readFileSync(mockFile, 'utf-8'));
        } else {
            next();
        }
    }
});

app.listen(9000, function () {
    if (config.openurl) {
        openurl.open(config.openurl);
    }
});