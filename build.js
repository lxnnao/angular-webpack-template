var webpack = require('webpack');
var webpackconf = require('./webpack.build.config');

webpack(webpackconf, function (err, states) {
    if (err) {
        throw err;
    }
    process.stdout.write(states.toString({
        colors: true,
        modules: true,
        children: true,
        chunks: true,
        chunkModules: true
    }) + '\n');
});