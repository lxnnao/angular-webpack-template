var webpack = require('webpack');
var exec = require('sync-exec');
var os = require('os');
var webpackconf = require('./webpack.build.config');

function execCmd(cmds, processOpts) {
    if (os.platform() === 'win32') {
        // windows
        var opts = ["cmd", "/c"];
    } else {
        // mac linux
        var opts = [];
    }
    opts = opts.concat(cmds);
    var msg = exec(opts.join(' '), 60000, processOpts);
    console.log(msg.stderr || msg.stdout);
    if (msg.status !== 0) {
        throw new Error('Exec cmd: [' + opts.join(' ') + ']');
    }
}

execCmd(['rm -rf build']);
execCmd(['rm -rf aot-js']);
execCmd(['rm -rf aot-ts']);

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