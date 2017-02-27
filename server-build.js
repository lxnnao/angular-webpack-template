var express = require('express');
var openurl = require('openurl');
var config = require('./shark-deploy-conf.json');
var compression = require('compression');

var app = express();
app.use(compression());
app.use(express.static('build'));
app.listen(9000, function () {
    if (config.openurl) {
        openurl.open(config.openurl);
    }
});