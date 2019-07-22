// reference: https://suanmei.github.io/2018/08/23/h5_call_app/
import getBrowser from "./getBrowser";
import getOsSystem from "./getOsSystem";

class CallClient {
  private osSystem = getOsSystem();
  private browser = getBrowser();
  private deepLink = "";
  private intentLink = "";
  private iosStore = "";
  private androidStore = "";
  private iframe: HTMLIFrameElement | null = null;
  private downloadTimer: number | null = null;

  constructor(
    deepLink: string,
    intentLink: string,
    iosStore: string,
    androidStore: string
  ) {
    if (!iosStore && !androidStore) {
      throw new Error(
        `please check your CallClient class constructor's args, you must assign a iosStore or androidStore`
      );
    }
    if (!deepLink) {
      throw new Error(
        `please check your CallClient class constructor's args, deepLink is null or undefined.`
      );
    }
    if (!intentLink) {
      console.warn(
        intentLink,
        "is null or undefined. CallClient will use deepLink instead."
      );
    }
    this.deepLink = deepLink;
    this.intentLink = intentLink;
    this.iosStore = iosStore;
    this.androidStore = androidStore;
    this.callApp = this.callApp.bind(this);
  }

  public callApp() {
    this.openApp();
    const startTime = Date.now();
    this.downloadApp(startTime);
  }

  private resetDownloadTimer() {
    if (this.downloadTimer) {
      window.clearTimeout(this.downloadTimer);
      this.downloadTimer = null;
    }
  }

  private downloadApp(startTime: number) {
    if (this.downloadTimer) {
      return;
    }
    const waitTime = 1500;
    this.downloadTimer = setTimeout(() => {
      const endTime = Date.now();
      const threshold = waitTime + 300;
      const hide = document.hidden || (document as any).webkitHidden;
      if (hide) {
        // hack for ios because timeout is running in ios;
        this.resetDownloadTimer();
        return;
      }

      if (!startTime || endTime - startTime < threshold) {
        // real runTime less than threshold means fail to open app
        if (this.osSystem.isIOS) {
          this.redirectLocation(this.iosStore || this.androidStore);
        } else {
          this.redirectLocation(this.androidStore || this.iosStore);
        }
      }
      this.resetDownloadTimer();
    }, waitTime);
  }

  private openApp() {
    if (this.osSystem.isIOS) {
      this.userAnchorLink(this.deepLink);
    } else if (this.browser.isChrome) {
      // when version >= 25 use intentLink
      // https://developer.chrome.com/multidevice/android/intents
      const major = Number(this.browser.version.split(".")[0]);
      if (major >= 25) {
        const appLink = this.intentLink || this.deepLink;
        this.redirectLocation(appLink);
      } else {
        this.redirectLocation(this.deepLink);
      }
    } else {
      this.callInIframe(this.deepLink);
    }
  }

  private userAnchorLink(url: string) {
    // https://stackoverflow.com/questions/1421584/how-can-i-simulate-a-click-to-an-anchor-tag
    const e = document.createEvent("MouseEvents");
    e.initMouseEvent(
      "click",
      true,
      true,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    let a = document.querySelector("#temp-smb-link");
    if (!a) {
      a = document.createElement("a");
      a.setAttribute("href", url);
      a.setAttribute("id", "temp-smb-link");
      (a as HTMLAnchorElement).style.display = "none";
    }
    document.body.appendChild(a);
    a.dispatchEvent(e);
    return a;
  }

  private callInIframe(url: string) {
    if (!this.iframe) {
      this.iframe = document.createElement("iframe");
      this.iframe.id = `callapp_iframe_${Date.now()}`;
      this.iframe.frameBorder = "0";
      this.iframe.style.cssText = "display:none;border:0;width:0;height:0;";
      document.body.appendChild(this.iframe);
    }
    this.iframe.src = url;
  }

  private redirectLocation(url: string) {
    window.location.href = url;
  }
}

export default CallClient;
