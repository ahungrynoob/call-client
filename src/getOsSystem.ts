// interface
interface IOSMatched {
    name: string,
    isWindowsPhone?: boolean,
    isAndroid?: boolean,
    isAndroidPad?: boolean,
    isIPhone?: boolean,
    isIPad?: boolean,
    isIOS?: boolean,
    version: string
}

export default function(){
    const ua = window.navigator.userAgent;
    const WindowsPhoneMatched = ua.match(/Windows\sPhone\s(?:OS\s)?([\d\.]+)/);
    const AndroidMatched = ua.match(/Android[\s\/]([\d\.]+)/);
    const iOSDeviceMatched = ua.match(/(iPhone|iPad|iPod)/);
    const iOSMatched = ua.match(/OS ([\d_\.]+) like Mac OS X/);

    let os:IOSMatched = {
        name:'unknown',
        version:'0.0.0'
    }
    if(WindowsPhoneMatched){
        os = {
            name: 'Windows Phone',
            isWindowsPhone: true,
            version: WindowsPhoneMatched[1],
        };
    }
    if(!!ua.match(/Safari/) && AndroidMatched){
        os.version = AndroidMatched[1];
        if(!!ua.match(/Mobile\s+Safari/)){
            os.name = 'Android';
            os.isAndroid = true;
        }else{
            os.name = 'AndroidPad';
            os.isAndroidPad = true;
        }
    }
    if(iOSDeviceMatched){
        const name = iOSDeviceMatched[1];
        if(iOSMatched){
            os = {
                name,
                isIPhone: name === 'iPhone' || name === 'iPod',
                isIPad: name === 'iPad',
                isIOS: true,
                version: iOSMatched[1].split('_').join('.'),
            }
        }
    }
    return os;
}