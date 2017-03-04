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


//font
app.use('/font', express.static(path.join(__dirname, 'font')));
//ajax mock
app.use('/xhr', function (req, res) {
    var data = path.join(__dirname, 'test/mock/xhr', req.path);
    if (fs.existsSync(data)) {
        res.send(fs.readFileSync(data));
    } else {
        res.status(404).send('file not exist !');
    }
});

app.listen(9000, function () {
    if (config.openurl) {
        openurl.open(config.openurl);
    }
});