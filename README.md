<<<<<<< HEAD
JPush API client library for NodeJS
=======
[![Build Status](https://travis-ci.org/jpush/jpush-api-nodejs-client.svg?branch=master)](https://travis-ci.org/jpush/jpush-api-nodejs-client)

# JPush API client library for Node.js
>>>>>>> master

## 概述
本SDK提供JPush服务端接口的Node封装，与 JPush Rest API 组件通信。使用时引用该模块即可，可参考附带Demo学习使用方法。

[REST API 文档][1]  
[NodeJS API DOC][2]


## Install
```
npm install jpush-sdk
#or
{
    "dependencies": {
        "jpush-sdk": "*"
    }
}
```


## Example

### Quick start
此Demo展示如何使用Node lib向所有用户推送通知。
``` js
var JPush = require("../lib/JPush/JPush.js");
var client = JPush.buildClient('your appKey', 'your masterSecret');

//easy push
client.push().setPlatform(JPush.ALL)
    .setAudience(JPush.ALL)
    .setNotification('Hi, JPush', JPush.ios('ios alert', 'happy', 5))
    .send(function(err, res) {
        if (err) {
            console.log(err.message);
        } else {
            console.log('Sendno: ' + res.sendno);
            console.log('Msg_id: ' + res.msg_id);
        }
    });
```

### Expert mode(高级版)

``` js
client.push().setPlatform('ios', 'android')
    .setAudience(JPush.tag('555', '666'), JPush.alias('666,777'))
    .setNotification('Hi, JPush', JPush.ios('ios alert'), JPush.android('android alert', null, 1))
    .setMessage('msg content')
    .setOptions(null, 60)
    .send(function(err, res) {
        if (err) {
            console.log(err.message);
        } else {
            console.log('Sendno: ' + res.sendno);
            console.log('Msg_id: ' + res.msg_id);
        }
    });

```

关于Payload对象的方法，参考 [详细API文档][4]

### 获取统计信息
本Node lib简易封装获取统计信息的接口，传入推送API返回的 msg_id 列表，多个 msg_id 用逗号隔开，最多支持100个msg_id。  
更多详细要求，请参考 [Report API 文档][5]

```js
var JPush = require("../lib/JPush/JPush.js");
var client = JPush.buildClient('your appKey', 'your masterSecret');

client.getReportReceiveds('746522674,344076897', function(err, res) {
    if (err) {
        console.log(err.message);
    } else {
        for (var i=0; i<res.length; i++) {
            console.log(res[i].android_received);
            console.log(res[i].ios_apns_sent);
            console.log(res[i].msg_id);
            console.log('------------');
        }
    }
});
```

### 关闭Log

```js
// 在构建JPushClient对象的时候, 指定isDebug参数
var client = JPush.buildClient({
    appKey:'47a3ddda34b2602fa9e17c01',
    masterSecret:'d94f733358cca97b18b2cb98',
    isDebug:false
});
// or
var client = JPush.buildClient('47a3ddda34b2602fa9e17c01', 'd94f733358cca97b18b2cb98', null, false);
```

### 单元测试

在程序根目录下执行.
```
mocha test 
```


  [1]: http://docs.jpush.cn/display/dev/Push-API-v3
  [2]: doc/api.md
  [3]: http://docs.jpush.cn/display/dev/Push-API-v3#Push-API-v3-%E6%8E%A8%E9%80%81%E5%AF%B9%E8%B1%A1
  [4]: doc/api.md
  [5]: http://docs.jpush.cn/display/dev/Report-API



