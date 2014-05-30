#JPush Api Nodejs client doc

##简要概述
本lib主要实现两个对象。
1.Payload对象，Payload结构请参考 [REST API 文档 推送对象][1]
2.JPushClient对象，主要功能为推送Payload对象，获取统计信息。

### JPushClient
构建器
```js
/**
 * 构建JPUSH客户端
 * @param options {appKey:"Your appkey", masterSecret:"Your masterSecret"}
 * @returns {JPushClient}
 */
JPush.buildClient(options);
```
内置方法
```js
/**
 * 推送payload对象
 * @param payload 由JPushClient构建的推送对象
 * @param callback(err，result) 回调函数，err：错误信息，无错误时为空， result: 返回的json字符串
 */
function sendPush(payload, callback);

/**
 * 获取统计数据
 * @param msg_ids msg_id字符串，多个 msg_id 用逗号隔开，最多支持100个msg_id。
 * @param callback 回调函数，err：错误信息，无错误时为空， result:返回的json字符串
 */
function getReport(msg_ids, callback);

```

### PushPayload
构建器
```js
/**
 * 推送payload对象
 * @param options 由JPushClient构建的推送对象，不填默认为{platform:'all', audience: 'all'}
 * @param callback(err，result) 回调函数，err：错误信息，无错误时为空， result：返回的json字符串
 */
Jpush.buildPayload(options);
```
内置对象
```js
/**
 * 设置 notification.alert 属性
 * @param alert string，通知正文
 * @returns {PushPayload}
 */
function alertAll(alert);

/**
 * 设置对应属性
 * @param params 对应的属性对象，其会与现有payload中的属性取并集
 * @returns {PushPayload}
 */
function setPlatform(platform);
function setAudience(audience);
function setMessage(message);
function setOptions(options);
function setNotification(notification);
function setAndroidNotification(androidNotification);
function setIOSNotification(iosNotification);
function setWinphoneNotification(winphoneNotification);
```

  [1]: http://docs.jpush.cn/display/dev/Push-API-v3#Push-API-v3-%E6%8E%A8%E9%80%81%E5%AF%B9%E8%B1%A1