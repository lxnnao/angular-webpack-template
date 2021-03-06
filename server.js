var webpack = require('webpack');
var webpackDevConfig = require('./webpack.dev.config');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var SharkConfig = require('./shark-deploy-conf');
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var openurl = require('openurl');
var compression = require('compression');
var argv = require('yargs').argv;
var proxy = require('http-proxy-middleware');//http请求转发
var IP = require('ip');

var app = express();
if (argv.env === 'dev') {
    var compiler = webpack(webpackDevConfig);
    var devMiddleware = webpackDevMiddleware(compiler, {
        publicPath: webpackDevConfig.output.publicPath,
        noInfo: false,
        stats: {
            colors: true
        }
    })
    app.use(devMiddleware);
    app.use(webpackHotMiddleware(compiler, {
        reload: true
    }));
}
else {
    app.use(compression());
    app.use(SharkConfig.contextPath, express.static('build/app'));
    app.use(SharkConfig.contextPath, express.static('build/mimg'));
}

//ajax
if (argv.server === 'mock') {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    //ajax mock
    app.use(SharkConfig.contextPath + '/xhr', function (req, res) {
        console.log('request url:' + req.url);
        var data = path.join(__dirname, 'test/mock/xhr', req.path);
        if (fs.existsSync(data)) {
            res.send(fs.readFileSync(data));
        } else {
            res.status(404).send('file not exist !');
        }
    });
}
else {
    var options = {
        target: argv.server,
        changeOrigin: true
    };
    var httpProxy = proxy(options);
    //ajax server
    app.use(SharkConfig.contextPath + '/xhr', function (req, res) {
        console.log('request url:' + req.url);
        httpProxy(req, res);
    });
}

//font
app.use(SharkConfig.contextPath + '/font', express.static(path.join(__dirname, 'font')));

//start server & listen 
devMiddleware.waitUntilValid(() => {
    // when env is testing, don't need open it
    if (SharkConfig.openurl) {
        let url = SharkConfig.openurl.replace('${0}', IP.address());
        openurl.open(url);
    }
})
app.listen(9000)
