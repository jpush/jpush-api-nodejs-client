# JPush API client library for Node.js

本 SDK 提供 JPush 服务端接口的 Node 封装，与 JPush Rest API 组件通信。使用时引用该模块即可，可参考附带 Demo 学习使用方法。

> Node >= 7.6（async/await 语法支持），若 node 版本小于 7.6 请使用 [legacy 分支的代码](https://github.com/jpush/jpush-api-nodejs-client/tree/legacy)

[REST API 文档](http://docs.jiguang.cn/jpush/server/push/server_overview/)

[NodeJS API 文档](https://github.com/jpush/jpush-api-nodejs-client/blob/master/doc/api.md)

## Install
```
npm install jpush-async
#or
{
    "dependencies": {
        "jpush-async": "*"
    }
}
```

## Example
### Quick start
此 Demo 展示如何使用 Node lib 向所有用户推送通知。
``` js
var JPush = require("../lib/JPush/JPushAsync.js")
var client = JPush.buildClient('your appKey', 'your masterSecret')

//easy push
client.push().setPlatform(JPush.ALL)
    .setAudience(JPush.ALL)
    .setNotification('Hi, JPush', JPush.ios('ios alert', 'happy', 5))
    .send()
    .then(function(result) {
        console.log(result)
    }).catch(function(err) {
        console.log(err)
    })
```

### Expert mode（高级版）

```js
client.push().setPlatform('ios', 'android')
    .setAudience(JPush.tag('555', '666'), JPush.alias('666,777'))
    .setNotification('Hi, JPush', JPush.ios('ios alert'), JPush.android('android alert', null, 1))
    .setMessage('msg content')
    .setOptions(null, 60)
    .send()
    .then(function(result) {
        console.log(result)
    }).catch(function(err) {
        console.log(err)
    });
```

关于 Payload 对象的方法，参考[详细 API 文档](https://github.com/jpush/jpush-api-nodejs-client/blob/master/doc/api.md)。

### 关闭 Log

```js
// 在构建 JPushClient 对象的时候, 指定 isDebug 参数。
var client = JPush.buildClient({
    appKey:'47a3ddda34b2602fa9e17c01',
    masterSecret:'d94f733358cca97b18b2cb98',
    isDebug:false
});
// or
var client = JPush.buildClient('47a3ddda34b2602fa9e17c01', 'd94f733358cca97b18b2cb98', null, false);
```

> 目前使用了 debug 模块来控制日志输出，若要查看 JPush 的相关日志信息，请先配置 DEBUG 环境变量 'jpush'。
