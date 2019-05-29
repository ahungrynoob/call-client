interface IBrowser {
    name:string;
    isUC?:boolean;
    isQQ?: boolean,
    isFirefox?: boolean,
    isIE?:boolean,
    isIELikeWebkit?:boolean,
    isIEMobile?:boolean,
    isChrome?:boolean,
    isOpera?:boolean,
    isSamsung?:boolean,
    isWebview?:boolean,
    isAndroid?:boolean,
    isSafari?:boolean,
    version:string
}

function getBrowser(){
    const ua = window.navigator.userAgent;
    const UCMatched  = ua.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/);
    const QQMatched = ua.match(/MQQBrowser\/([\d\.]+)/);
    const FFMatched = ua.match(/(?:Firefox|FxiOS)\/([\d\.]+)/);
    const IEMatched = ua.match(/MSIE\s([\d\.]+)/);
    const IEMobileMatched = ua.match(/IEMobile\/([\d\.]+)/);
    const ChromeMatched = ua.match(/(?:Chrome|CriOS)\/([\d\.]+)/);
    const OperaMatched = ua.match(/Opera|OPR\//);
    const SamsungMatched = ua.match(/SAMSUNG|Samsung|samsung/);
    const WebviewMatched = ua.match(/Version\/[\d+\.]+\s*Chrome/);
    const AndroidMatched = ua.match(/Android[\s\/]([\d\.]+)/);
    const SafariMatched = ua.match(/Version\/([\d\.]+)/);
    const iOSMatched = ua.match(/OS ([\d_\.]+) like Mac OS X/);

    let browser:IBrowser = {
        name: 'unknown',
        version: '0.0.0',
      };
    if(UCMatched){
        browser = {
            name:'UC',
            isUC:true,
            version:UCMatched[1]
        };
    }
    if(QQMatched){
        browser = {
            name:'QQ',
            isQQ:true,
            version: QQMatched[1]
        }
    }
    if(FFMatched){
        browser = {
            name:'Firefox',
            isQQ:true,
            version: FFMatched[1]
        }
    }
    if(IEMatched || IEMobileMatched){
        const version = IEMatched && IEMatched[1] || IEMobileMatched && IEMobileMatched[1] || "0.0.0";
        if(ua.match(/IEMobile/)){
            browser = {
                name:'IEMobile',
                isIEMobile:true,
                version
            }
        }else if (ua.match(/Android|iPhone/)){
            browser = {
                name:'IE',
                isIELikeWebkit:true,
                version
            }
        }else{
            browser = {
                name:'IE',
                isIE:true,
                version
            }
        }
    }
    if(ChromeMatched){
        browser = {
            name: 'Chrome',
            isChrome: true,
            version: ChromeMatched[1],
        };
        if(OperaMatched){
            browser = {
                name: 'Opera',
                isOpera: true,
                version: OperaMatched[1],
            };
        }
        if(SamsungMatched){
            browser.isSamsung = true;
        }
        if(WebviewMatched){
            browser.name = 'Chrome Webview';
            browser.isWebview = true;
        }
    }
    if(!!ua.match(/Safari/) && AndroidMatched){
        browser = {
            name: 'Android',
            isAndroid: true,
            version: AndroidMatched[1],
          };
    }
    if(ua.match(/iPhone|iPad|iPod/)){
        if(ua.match(/Safari/) && SafariMatched){
            browser = {
                name: 'Safari',
                isSafari: true,
                version: SafariMatched[1],
            };
        }
        if(iOSMatched){
            browser = {
                name: 'iOS Webview',
                isWebview: true,
                version: iOSMatched[1].replace(/\_/g, '.'),
            };
        }
    }
    return browser;
}

export default getBrowser;