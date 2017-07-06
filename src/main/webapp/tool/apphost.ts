var AppHost = {
    ready: function (cb) {
        let win: any = window;
        if (win.isAppReady === true) {
            cb();
        }
        else {
            document.addEventListener('DOMContentLoaded', () => {
                if (!win.isAppReady) {
                    if (win.NEJsbridge) {
                        win.isAppReady = true;
                        cb();
                    }
                }
            }, false);
            document.addEventListener('NEJsbridgeReady', () => {
                if (!win.isAppReady) {
                    if (win.NEJsbridge) {
                        win.isAppReady = true;
                        cb();
                    }
                }
            }, false);
        }
    },
    open: function (url) {
        if (/yanxuan/.test(navigator.userAgent)) {
            //app中            
            let newUrl = 'yanxuan://yxbiwebview?url=' + encodeURIComponent(url);
            window.location.href = newUrl;
        }
        else {
            window.location.href = url;
        }
    },
    setTitle: function (title) {
        let win: any = window;
        win.NEJsbridge.call('setTitle', JSON.stringify({ 'title': title }));
    },
    setRefreshBtn: function (cb) {
        let win: any = window;
        win.NEJsbridge.call('setRightBtnParams', JSON.stringify({ 'btnType': 'refresh' }));
        if (cb) {
            win.onRefreshBtnClicked = cb
        }
    }
}

export { AppHost };