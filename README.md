# @dxd_sjtu/call-client

[中文版文档](https://github.com/ahungrynoob/call-client/blob/master/README-ZH.md/ "中文版文档") 

## What is it：
    This is a lib to call a app in h5 env.

## Init Args：
- deepLink          //URLSchema;
- intentLink        //intent link for android;
- iosStore          //ios's app store link for app
- androidStore      //android's app store link for app

## Usage
```javascript
import CallClient from '@dxd_sjtu/call-client';

const deepLink = 'userschema for your app';
const intentLink = 'intent for your android app';
const iosStore = 'https://itunes.apple.com/app/id785385147?mt=8';
const androidStore = 'https://play.google.com/store/apps/details?id=com.lazada.android';

const callClient = new CallClient(
      deepLink,
      intentLink,
      iosStore,
      androidStore
    );
callClient.callApp();
```

## Behavior:
    It will call app at first, if no app is called then it will link to your download link.

## TODO:
    track config