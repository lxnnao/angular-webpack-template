var path = require('path');
var argv = require('yargs').argv;
var deployGit = require('shark-deploy-git');
var SharkConfig = require('./shark-deploy-conf');
// build dir
var buildWebappDir = path.join(SharkConfig.build, SharkConfig.buildWebapp);
var buildStaticsDir = path.join(SharkConfig.build, SharkConfig.buildStatics);
// branch
var branch = argv.branch;
// target
var target = argv.target;
// groupName
var groupName = SharkConfig['groupName'][target];

// webapp deploy
var optionsWebapp = {
    branch: branch,
    build: buildWebappDir,
    deploy: path.join(SharkConfig.deploy.webapp, target),
    repo: `http://${SharkConfig.deploy.account}:${SharkConfig.deploy.password}@git.internal/${groupName}/${SharkConfig.product}.git`,
    empty: true
};
console.log(optionsWebapp);
deployGit(optionsWebapp);

// statics deploy
var optionsStatics = {
    branch: branch,
    build: buildStaticsDir,
    deploy: path.join(SharkConfig.deploy.static, target, 'mimg.127.net/hxm', SharkConfig.product),
    repo: `http://${SharkConfig.deploy.account}:${SharkConfig.deploy.password}@git.internal/${groupName}/${SharkConfig.product}-statics.git`,
    empty: true
};
console.log(optionsStatics);
deployGit(optionsStatics);
