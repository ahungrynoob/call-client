"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// reference: https://suanmei.github.io/2018/08/23/h5_call_app/
var getBrowser_1 = require("./getBrowser");
var getOsSystem_1 = require("./getOsSystem");
var CallClient = /** @class */ (function () {
    function CallClient(deepLink, intentLink, iosStore, androidStore) {
        this.osSystem = getOsSystem_1.default();
        this.browser = getBrowser_1.default();
        this.deepLink = "";
        this.intentLink = "";
        this.iosStore = "";
        this.androidStore = "";
        this.iframe = null;
        this.downloadTimer = null;
        if (!iosStore && !androidStore) {
            throw new Error("please check your CallClient class constructor's args, you must assign a iosStore or androidStore");
        }
        if (!deepLink) {
            throw new Error("please check your CallClient class constructor's args, deepLink is null or undefined.");
        }
        if (!intentLink) {
            console.warn(intentLink, 'is null or undefined. CallClient will use deepLink instead.');
        }
        this.deepLink = deepLink;
        this.intentLink = intentLink;
        this.iosStore = iosStore;
        this.androidStore = androidStore;
        this.callApp = this.callApp.bind(this);
    }
    CallClient.prototype.callApp = function () {
        this.openApp();
        var startTime = Date.now();
        this.downloadApp(startTime);
    };
    CallClient.prototype.downloadApp = function (startTime) {
        var _this = this;
        if (this.downloadTimer) {
            return;
        }
        var waitTime = 1500;
        this.downloadTimer = setTimeout(function () {
            var endTime = Date.now();
            var threshold = waitTime + 300;
            var hide = document.hidden || document.webkitHidden;
            if (hide) {
                // hack for ios because timeout is running in ios;
                return;
            }
            if (!startTime || (endTime - startTime) < threshold) {
                // real runTime less than threshold means fail to open app
                if (_this.osSystem.isIOS) {
                    _this.redirectLocation(_this.iosStore || _this.androidStore);
                }
                else {
                    _this.redirectLocation(_this.androidStore || _this.iosStore);
                }
            }
        }, waitTime);
    };
    CallClient.prototype.openApp = function () {
        if (this.osSystem.isIOS) {
            this.userAnchorLink(this.deepLink);
        }
        else if (this.browser.isChrome) {
            // when version >= 25 use intentLink
            // https://developer.chrome.com/multidevice/android/intents
            var major = Number(this.browser.version.split('.')[0]);
            if (major >= 25) {
                var appLink = this.intentLink || this.deepLink;
                this.redirectLocation(appLink);
            }
            else {
                this.redirectLocation(this.deepLink);
            }
        }
        else {
            this.callInIframe(this.deepLink);
        }
    };
    CallClient.prototype.userAnchorLink = function (url) {
        // https://stackoverflow.com/questions/1421584/how-can-i-simulate-a-click-to-an-anchor-tag
        var e = document.createEvent('MouseEvents');
        e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        var a = document.querySelector('#temp-smb-link');
        if (!a) {
            a = document.createElement('a');
            a.setAttribute('href', url);
            a.setAttribute('id', 'temp-smb-link');
            a.style.display = 'none';
        }
        document.body.appendChild(a);
        a.dispatchEvent(e);
        return a;
    };
    CallClient.prototype.callInIframe = function (url) {
        if (!this.iframe) {
            this.iframe = document.createElement('iframe');
            this.iframe.id = "callapp_iframe_" + Date.now();
            this.iframe.frameBorder = '0';
            this.iframe.style.cssText = 'display:none;border:0;width:0;height:0;';
            document.body.appendChild(this.iframe);
        }
        this.iframe.src = url;
    };
    CallClient.prototype.redirectLocation = function (url) {
        window.location.href = url;
    };
    return CallClient;
}());
exports.default = CallClient;
