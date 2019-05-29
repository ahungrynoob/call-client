# @dxd_sjtu/call-client

## 描述：
    帮助你去唤起你的APP

## 初始化参数：
- deepLink          //URLSchema;
- intentLink        //安卓系统的intent链接;
- iosStore          //IOS的app-store下载页面
- androidStore      //安卓的app下载页面

## 用法：
```javascript
import CallClient from '@dxd_sjtu/call-client';
const deepLink = 'userschema for your app';
const intentLink = 'intent for your app';
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

## 行为:
    该模块会先去调起相应APP，如果没有则跳转到对应的下载页。

## TODO:
    增加埋点上报配置