JPush接口说明
=============
接口使用基本按照java版本SDK，针对简易发送接口进行了基本封装。  

## 简易版推送接口
所有消息内容使用字符串格式，不需要手动包装成json字符串或者是js对象。

- `sendNotificationWithImei(sendno, imei, msgTitle, msgContent, callback);`
- `sendCustomMessageWithImei(sendno, imei, msgTitle, msgContent, callback);`
- `sendNotificationWithTag(sendno, tag, msgTitle, msgContent, callback);`
- `sendCustomMessageWithTag(sendno, tag, msgTitle, msgContent, callback);`
- `sendNotificationWithAlias(sendno, alias, msgTitle, msgContent, callback);`
- `sendCustomMessageWithAlias(sendno, alias, msgTitle, msgContent, callback);`
- `sendNotificationWithAppKey(sendno, msgTitle, msgContent, callback);`
- `sendCustomMessageWithAppKey(sendno, msgTitle, msgContent, callback);`

## 更自由的推送接口（针对官方rest api进行简单封装）

- `pushNotification(sendno, receiver, msg, options, callback);`
- `pushAndroidMessage(sendno, receiver, msg, options, callback);`
- `pushSimpleNotification(sendno, receiver, msg, options, callback);`
- `pushAndroidSimpleMessage(sendno, receiver, msg, options, callback);`

### 提供的相关常量

为了简化api要求的常量记忆，提供了两个常量对象。如下：

- `pushType`: 主要有imei, tag, alias, broadcast四个选项
- `platformType`: 主要有android, ios, both三个选项 

### 相关的参数说明

`receiver` 参数对象需要包含两个属性  
- `type` 表明发送的推送类型，目前可以为pushType中的一个
- `value` 与 `type` 对应，可以是imei, tag, alias, 如果是广播消息(broadcast选项)则置空。

`msg` 参数对象是相应待推送的通知/消息的内容。详细的说明可以参考官方[rest api](http://docs.jpush.cn/display/dev/Push+API+v2#PushAPIv2-消息内容格式)。  
**通知**的内容主要需要以下几个属性：  
- `n_builder_id` 可选，默认为0,表示默认的推送样式，可选范围为1～1000。
- `n_title` 可选，通知的标题，不选则默认使用应用的名称。
- `n_content` 必填，通知的内容。
- `n_extras` 可选，通知的附加信息，以JSON格式传递，应用能够取得全部内容。

**消息**的内容主要需要以下几个属性：
- `message` 必填，自定义消息的内容。
- `content_type` 可选，message字段的内容类型。用于特定message内容解析。
- `title` 可选，自定义消息的标题。
- `extras` 可选，JSON格式的附加信息，将会原样返回。

`options` 参数对象可以包含两个属性  
- `time_to_live` 表示消息离线保存的时长，默认为一天，最多十天，单位为秒
- `override_msg_id` 表示待覆盖的上一条消息的ID

