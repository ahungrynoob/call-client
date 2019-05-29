interface IBrowser {
    name: string;
    isUC?: boolean;
    isQQ?: boolean;
    isFirefox?: boolean;
    isIE?: boolean;
    isIELikeWebkit?: boolean;
    isIEMobile?: boolean;
    isChrome?: boolean;
    isOpera?: boolean;
    isSamsung?: boolean;
    isWebview?: boolean;
    isAndroid?: boolean;
    isSafari?: boolean;
    version: string;
}
declare function getBrowser(): IBrowser;
export default getBrowser;
