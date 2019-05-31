# @dxd_sjtu/call-client

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@dxd_sjtu/call-client.svg?style=flat-square
[npm-url]: http://npmjs.org/package/@dxd_sjtu/call-client
[download-image]: https://img.shields.io/npm/dm/@dxd_sjtu/call-client.svg?style=flat-square
[download-url]: https://npmjs.org/package/@dxd_sjtu/call-client

## 描述：
    帮助你去唤起你的APP

## 安装
```shell
$ npm install @dxd_sjtu/call-client --save
$ yarn add @dxd_sjtu/call-client
```

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