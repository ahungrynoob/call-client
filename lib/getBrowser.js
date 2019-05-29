"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getBrowser() {
    var ua = window.navigator.userAgent;
    var UCMatched = ua.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/);
    var QQMatched = ua.match(/MQQBrowser\/([\d\.]+)/);
    var FFMatched = ua.match(/(?:Firefox|FxiOS)\/([\d\.]+)/);
    var IEMatched = ua.match(/MSIE\s([\d\.]+)/);
    var IEMobileMatched = ua.match(/IEMobile\/([\d\.]+)/);
    var ChromeMatched = ua.match(/(?:Chrome|CriOS)\/([\d\.]+)/);
    var OperaMatched = ua.match(/Opera|OPR\//);
    var SamsungMatched = ua.match(/SAMSUNG|Samsung|samsung/);
    var WebviewMatched = ua.match(/Version\/[\d+\.]+\s*Chrome/);
    var AndroidMatched = ua.match(/Android[\s\/]([\d\.]+)/);
    var SafariMatched = ua.match(/Version\/([\d\.]+)/);
    var iOSMatched = ua.match(/OS ([\d_\.]+) like Mac OS X/);
    var browser = {
        name: 'unknown',
        version: '0.0.0',
    };
    if (UCMatched) {
        browser = {
            name: 'UC',
            isUC: true,
            version: UCMatched[1]
        };
    }
    if (QQMatched) {
        browser = {
            name: 'QQ',
            isQQ: true,
            version: QQMatched[1]
        };
    }
    if (FFMatched) {
        browser = {
            name: 'Firefox',
            isQQ: true,
            version: FFMatched[1]
        };
    }
    if (IEMatched || IEMobileMatched) {
        var version = IEMatched && IEMatched[1] || IEMobileMatched && IEMobileMatched[1] || "0.0.0";
        if (ua.match(/IEMobile/)) {
            browser = {
                name: 'IEMobile',
                isIEMobile: true,
                version: version
            };
        }
        else if (ua.match(/Android|iPhone/)) {
            browser = {
                name: 'IE',
                isIELikeWebkit: true,
                version: version
            };
        }
        else {
            browser = {
                name: 'IE',
                isIE: true,
                version: version
            };
        }
    }
    if (ChromeMatched) {
        browser = {
            name: 'Chrome',
            isChrome: true,
            version: ChromeMatched[1],
        };
        if (OperaMatched) {
            browser = {
                name: 'Opera',
                isOpera: true,
                version: OperaMatched[1],
            };
        }
        if (SamsungMatched) {
            browser.isSamsung = true;
        }
        if (WebviewMatched) {
            browser.name = 'Chrome Webview';
            browser.isWebview = true;
        }
    }
    if (!!ua.match(/Safari/) && AndroidMatched) {
        browser = {
            name: 'Android',
            isAndroid: true,
            version: AndroidMatched[1],
        };
    }
    if (ua.match(/iPhone|iPad|iPod/)) {
        if (ua.match(/Safari/) && SafariMatched) {
            browser = {
                name: 'Safari',
                isSafari: true,
                version: SafariMatched[1],
            };
        }
        if (iOSMatched) {
            browser = {
                name: 'iOS Webview',
                isWebview: true,
                version: iOSMatched[1].replace(/\_/g, '.'),
            };
        }
    }
    return browser;
}
exports.default = getBrowser;
