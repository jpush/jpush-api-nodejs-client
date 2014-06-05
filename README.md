#JPush API client library for Nodejs

## 概述
这是 JPush REST API 的 Nodejs 版本封装开发包，是由极光推送官方提供的，一般支持最新的 API 功能。

[REST API 文档][1]  
[NodeJS API DOC][2]


## Install
尽请期待


## Example

### Quick start
此Demo展示如何使用Node lib向所有用户推送通知。
``` js
var JPush = require('jpush-sdk');
var client = JPush.buildClient({appKey:"Your appkey", masterSecret:"Your masterSecret"});
payload.alertAll("Hello JPush.");

client.sendPush(payload, function (err, result) {
    if (err) {
        console.log(err);
    } else {
        console.log(result);
    }
});


```

### Expert mode(高级版)
首先先构建推送对象Payload。Payload的结构与REST API中所要求结构一致。  
详情参考 [REST API 文档 推送对象][3]

``` js
var JPush = require('jpush-sdk');
var client = JPush.buildClient({appKey:"Your appkey", masterSecret:"Your masterSecret"});
//构建推送对象
var payload = JPush.buildPayload();
payload.setPlatform(["ios","android"]);
payload.alertAll("Hello JPush.");
payload.setAudience({
        tag:["tag1", "tag2"],
        tag_and:["tag3", "tag4"]}
);
payload.setAndroidNotification({
    alert : 'android alert',
    title : 'android title'
});
payload.setOptions({time_to_live:60});
client.sendPush(payload, function (err, result) {
    if (err) {
        console.log(err);
    } else {
        console.log(result);
    }
});

```

关于Payload对象的方法，参考 [详细API文档][4]

### 获取统计信息
本Node lib简易封装获取统计信息的接口，传入推送API返回的 msg_id 列表，多个 msg_id 用逗号隔开，最多支持100个msg_id。  
更多详细要求，请参考 [Report API 文档][5]

```js
var JPush = require('jpush-sdk');
var client = JPush.buildClient({appKey:"Your appkey", masterSecret:"Your masterSecret"});
client.getReport("837477020,1374362852", function(err, result) {
    if (err) {
        console.log(err);
    } else {
        console.log(result);
    }
});
```

### 单元测试
在程序根目录下执行 
```
mocha test
```


  [1]: http://docs.jpush.cn/display/dev/Push-API-v3
  [2]: doc/api.md
  [3]: http://docs.jpush.cn/display/dev/Push-API-v3#Push-API-v3-%E6%8E%A8%E9%80%81%E5%AF%B9%E8%B1%A1
  [4]: doc/api.md
  [5]: http://docs.jpush.cn/display/dev/Report-API