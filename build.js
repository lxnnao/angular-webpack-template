var path = require('path');
var fs = require('fs');
var fse = require('fs-extra');
var webpack = require('webpack');
var webpackconf = require('./webpack.build.config');
var config = require('./shark-deploy-conf');
var argv = require('yargs').argv;

// empty build dir
fse.emptyDirSync('./build');
if (argv.target) {
    webpackconf.output.publicPath = config['mimgURLPrefix'][argv.target];
}
webpack(webpackconf, function (err, states) {
    if (err) {
        throw err;
    }
    //webpack info
    process.stdout.write(states.toString({
        colors: true,
        modules: true,
        children: true,
        chunks: true,
        chunkModules: true
    }) + '\n');

    // copy favicon.ico
    fse.copySync('./src/main/webapp/favicon.ico', './build/app/favicon.ico');
    // copy index
    fse.copySync('./build/client/index.html', './build/app/index.html');
    // copy mimg
    fse.copySync('./build/client/js', './build/mimg/js');
    fse.copySync('./build/client/css', './build/mimg/css');
    fse.copySync('./build/client/images', './build/mimg/images');
});

