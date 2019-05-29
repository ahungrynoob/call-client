interface IOSMatched {
    name: string;
    isWindowsPhone?: boolean;
    isAndroid?: boolean;
    isAndroidPad?: boolean;
    isIPhone?: boolean;
    isIPad?: boolean;
    isIOS?: boolean;
    version: string;
}
export default function (): IOSMatched;
export {};
