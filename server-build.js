var express = require('express');
var openurl = require('openurl');
var config = require('./shark-deploy-conf.json');
var compression = require('compression');
var path = require('path');

var app = express();
app.use(compression());
app.use(express.static('build/client'));
//font
app.use('/font', express.static(path.join(__dirname, 'font')));
//ajax mock
app.use('/xhr', function(req, res) {
    var data = path.join(__dirname,'test/mock/xhr', req.path);
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