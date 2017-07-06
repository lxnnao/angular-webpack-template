module.exports = {
    product: "newvip-h5",
    build: "build",
    buildWebapp: "app",
    buildStatics: "mimg",
    contextPath: "/newvip",
    openurl: "http://${0}:9000/newvip/index.html",
    mimgURLPrefix: {
        online: '//mailpub.nosdn.127.net/hxm/newvip-h5/',       //nos.netease.com/mailpub/hxm              mailpub桶支持cdn
        test: '//nos.netease.com/mailpub-test/hxm/newvip-h5/'   //nos.netease.com/mailpub-test/hxm         mailpub-test桶不支持cdn
    },
    groupName: {
        test: "datasmart-test",
        online: "datasmart-deploy"
    },
    deploy: {
        webapp: "/home/wpd/deploy/datasmart-deploy/deploy/newvip-h5",
        static: "/home/wpd/deploy/pages",
        account: "deployer",
        password: "SU42HVeK"
    }
};