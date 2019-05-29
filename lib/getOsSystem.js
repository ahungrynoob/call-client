"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1() {
    var ua = window.navigator.userAgent;
    var WindowsPhoneMatched = ua.match(/Windows\sPhone\s(?:OS\s)?([\d\.]+)/);
    var AndroidMatched = ua.match(/Android[\s\/]([\d\.]+)/);
    var iOSDeviceMatched = ua.match(/(iPhone|iPad|iPod)/);
    var iOSMatched = ua.match(/OS ([\d_\.]+) like Mac OS X/);
    var os = {
        name: 'unknown',
        version: '0.0.0'
    };
    if (WindowsPhoneMatched) {
        os = {
            name: 'Windows Phone',
            isWindowsPhone: true,
            version: WindowsPhoneMatched[1],
        };
    }
    if (!!ua.match(/Safari/) && AndroidMatched) {
        os.version = AndroidMatched[1];
        if (!!ua.match(/Mobile\s+Safari/)) {
            os.name = 'Android';
            os.isAndroid = true;
        }
        else {
            os.name = 'AndroidPad';
            os.isAndroidPad = true;
        }
    }
    if (iOSDeviceMatched) {
        var name_1 = iOSDeviceMatched[1];
        if (iOSMatched) {
            os = {
                name: name_1,
                isIPhone: name_1 === 'iPhone' || name_1 === 'iPod',
                isIPad: name_1 === 'iPad',
                isIOS: true,
                version: iOSMatched[1].split('_').join('.'),
            };
        }
    }
    return os;
}
exports.default = default_1;
