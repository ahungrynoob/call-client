# @dxd_sjtu/call-client
[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@dxd_sjtu/call-client.svg?style=flat-square
[npm-url]: http://npmjs.org/package/@dxd_sjtu/call-client
[download-image]: https://img.shields.io/npm/dm/@dxd_sjtu/call-client.svg?style=flat-square
[download-url]: https://npmjs.org/package/@dxd_sjtu/call-client

[中文版文档](https://github.com/ahungrynoob/call-client/blob/master/README-ZH.md/ "中文版文档") 

## What is it：
    This is a lib to call a app in h5 env.

## Install
```shell
$ npm install @dxd_sjtu/call-client --save
$ yarn add @dxd_sjtu/call-client
```

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