Node.js sdk for JPush
======================
极光推送服务端 SDK Node.js版  
forked from [https://github.com/youxiachai/JPush-Node.js-sdk](https://github.com/youxiachai/JPush-Node.js-sdk)  
感谢作者做的先期工作。
## Install

```
npm install jpush-sdk
```

## Example

### Quick start(简易版)

``` js
var JPush = require('jpush-sdk');

var jpushClient = JPush.build({appkey: "your app key", masterSecret: "your master secret key"});

var sendno = 1;
var msgTitle = 'hello';
var msgContent = 'world';
jpushClient.sendNotificationWithAppKey(sendno, msgTitle, msgContent, function (err, body) {
    // JPush server message
    if (err) {
        console.log('error happened:'+err);
    }
    console.log(body);
});
```

### Expert mode(高级版)

``` js
var JPush = require('jpush-sdk');

var jpushClient = JPush.build({appkey: "you app key", masterSecret: "you master secret key"});

// type value 的限制与文档一致
var receiver = {};
receiver.type = jpushClient.pushType.broadcast;
receiver.value = '';

var msg = {};
msg.content =  'Hi! from boardcast';
msg.platform = jpushClient.platformType.both;

jpushClient.pushSimpleNotification(1, receiver, msg, function (err, body) {
  // JPush server message
  console.log(body);
});
```

API文档：[api.md](/doc/api.md)  
官方接口说明：[http://docs.jpush.cn/display/dev/Push+API+v2](http://docs.jpush.cn/display/dev/Push+API+v2)
