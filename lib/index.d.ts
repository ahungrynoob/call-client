declare class CallClient {
    private osSystem;
    private browser;
    private deepLink;
    private intentLink;
    private iosStore;
    private androidStore;
    private iframe;
    private downloadTimer;
    constructor(deepLink: string, intentLink: string, iosStore: string, androidStore: string);
    callApp(): void;
    private downloadApp;
    private openApp;
    private userAnchorLink;
    private callInIframe;
    private redirectLocation;
}
export default CallClient;
