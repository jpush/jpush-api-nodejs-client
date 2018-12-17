# JPush Node.js client api doc

## 整体描述
本 SDK 提供 JPush 服务端接口的 Node 封装，与 [JPush Rest API][1]  组件通信。使用时引用该模块即可，可参考附带 Demo 学习使用方法。

## 公共类型定义

函数：

|函数|说明|
|-----|-----|
|tag|创建 audience 的 tag 属性,使用方法请参考 Audience 示例。|
|tag_and|创建 audience 的 tag_and 属性,使用方法请参考 Audience 示例。|
|tag_not|创建 audience 的 tag_not 属性,使用方法请参考 Audience 示例。|
|alias|创建 audience 的 alias 属性,使用方法请参考 Audience 示例。|
|registration_id|创建 audience 的 reigistration 属性，使用方法请参考 Audience 示例。|
|segment|创建 audience 的 segment 属性，使用方法请参考 Audience 示例。|
|abtest|创建 audience 的 abtest 属性，使用方法请参考 Audience 示例。|
|ios|创建 iOS Notification，接收 5 个参数：alert, sound, badge, contentAvailable, extras。|
|android|创建 Android Notification。|
|winphone|创建 WinPhone Notification。|

**ios(alert,sound,badge,contentAvailable,extras)**  

创建 iOS Notification

|参数|类型|必须|默认值|说明|
|-----|-----|-----|-----|-----|
|alert|string|是|无|通知内容。|
|sound|string|否|无|如果为 null，则此消息无声音提示；有此字段，如果找到了指定的声音就播放该声音，否则播放默认声音, 如果此字段为空字符串('')，iOS 7 为默认声音，iOS 8 及以上系统为无声音。(消息) 说明：JPush 官方 API Library (SDK) 会默认填充声音字段。提供另外的方法关闭声音。|
|badge|int|否|无|如果为 null，表示不改变角标数字；否则把角标数字改为指定的数字；为 0 表示清除。|
|contentAvailable|boolean|否|无|推送的时候携带 "content-available":true 说明是 Background Remote Notification，如果不携带此字段则是普通的 Remote Notification。详情参考：[Background Remote Notification](http://docs.jiguang.cn/jpush/client/iOS/ios_new_fetures/#ios-7-background-remote-notification)|
|extras|object|否|无|自定义 key / value 信息，以供业务使用。|
|category|string|否|无|iOS 8 开始支持，即 APNs payload 中的 'category' 字段。|
|mutableContent|boolean|否|无|推送的时候携带"mutable-content":true 说明是支持 iOS 10 的 UNNotificationServiceExtension，如果不携带此字段则是普通的 Remote Notification。详情参考：[UNNotificationServiceExtension](https://developer.apple.com/reference/usernotifications/unnotificationserviceextension)|

**android(alert, title, builder_id, extras, priority, category, style, value, alertType)**

|参数|类型|必须|默认值|说明|
|-----|-----|-----|-----|-----|
|alert|string|是|无|通知内容。|
|title|string|否|无|通知标题。|
|builder_id|int|否|无|Android SDK 可设置通知栏样式，这里根据样式 ID 来指定该使用哪套样式。|
|extras|object|否|无|自定义 key / value 信息，以供业务使用。|
|priority|int|否|无|通知栏展示优先级，默认为0，范围为 -2～2 ，其他值将会被忽略而采用默认。|
|category|string|否|无|通知栏条目过滤或排序，完全依赖 rom 厂商对 category 的处理策略。|
|style|int|否|无|通知栏样式类型，默认为0，还有1，2，3可选，用来指定选择哪种通知栏样式，其他值无效。有三种可选分别为 bigText=1，Inbox=2，bigPicture=3。|
|value|object|否|无|当 style = 1, 为大文本通知栏样式，类型为 string，内容会被通知栏以大文本的形式展示出来。支持 API 16 以上的 rom；<br>当 style = 2，为文本条目通知栏样式，类型为 json 对象，json 的每个 key 对应的 value 会被当作文本条目逐条展示。支持 API 16 以上的 rom；<br>当 style = 3，为大图片通知栏样式，类型为 string，可以是网络图片 url，或本地图片的 path，目前支持.jpg和.png后缀的图片。图片内容会被通知栏以大图片的形式展示出来。如果是 http／https 的url，会自动下载；如果要指定开发者准备的本地图片就填 sdcard 的相对路径。支持 API 16以上的 rom。|
|alertTYpe|int|否|-1|可选范围为 -1 ～ 7 ，对应 Notification.DEFAULT_ALL = -1 或者 Notification.DEFAULT_SOUND = 1, Notification.DEFAULT_VIBRATE = 2, Notification.DEFAULT_LIGHTS = 4 的任意 “or” 组合。默认按照 -1 处理。|

**winphone(alert, title, openPage, extras)**

|参数|类型|必须|默认值|说明|
|-----|-----|-----|-----|-----|
|alert|string|是|无|通知内容。|
|title|string|否|无|通知标题。|
|openPage|string|否|无|点击打开的页面。会填充到推送信息的 param 字段上，表示由哪个 App 页面打开该通知。可不填，则由默认的首页打开。|
|extras|object|否|无|自定义 key / value 信息，以供业务使用。|

常量

|字段名|说明|
|-----|-----|
|ALL|设置 audience 与 platform 为推送全部对象时使用。|
|DISABLE_SOUND|设置 iOS Notification 不需要声音时使用。|
|DISABLE_BADGE|设置 iOS Notification 不需要角标时使用。|

类

|类名|说明|
|-----|-----|
|APIConnectionError|网络原因使请求失败时候抛出的异常。|
|APIRequestError|推送失败时抛出的异常，携带服务器返回的失败提示。|
|InvalidArgumentError|参数错误抛出的异常。|
|JPushClient|推送客户端，是所有 API 调用的对外接口。|
|PushPayload|推送对象。|

----------

### JPush  

JPush Client API，调用该类的实例执行对 JPush API 的请求。

构建方法  

**JPush.buildClient(appkey, masterSecret, retryTimes)**  

|参数|类型|必须|默认值|说明|
|-----|-----|-----|-----|-----|
|appKey|string|是|无|开发者 AppKey，可从 JPush Portal 获取|
|masterSecret|string|是|无|开发者 masterSecret，可从 JPush Portal 获取|
|retryTimes|int|否|5|请求失败重试次数|
|isGroup|bool|否|false|是否是群组发送，一个实例只能为群组或不是群组，无法切换|

该类包含的接口有：

#### push()

创建推送对象 PushPayload，每次推送创建一个推送对象。

#### sendPush(payload)

推送 payload 对象到 JPush 服务器上，该方法由 PushPayload.send() 调用，建议不要主动调用此函数。

|参数|类型|必须|默认值|说明|
|-----|-----|-----|-----|-----|
|payload|PushPayload|是|无|需要推送的 PushPayload 对象。|

#### getReportReceiveds(msg_ids)

获取对应 msg_id 的返回报告，多个 msg_id 用逗号连接起来，中间不要有空格。

|参数|类型|必须|默认值|说明|
|-----|-----|-----|-----|-----|
|msg_ids|string|是|无|需要获取的 msg_id，多个 msg_id用逗号连接起来，中间不要有空格。|

#### setSchedule(payload)
设置指定的定时任务，该方法由 PushPayload.setSchedule() 调用，不需要主动调用此函数。

|参数|类型|必须|默认值|说明|
|-----|-----|-----|-----|-----|
|payload|PushPayload|是|无|需要设置的 PushPayload 对象。|

#### updateSchedule(scheduleID, payload)
更新指定的定时任务，该方法由 PushPayload.updateSchedule() 调用，不需要主动调用此函数。

|参数|类型|必须|默认值|说明|
|-----|-----|-----|-----|-----|
|scheduleID|string|是|无|需要更新的定时任务 ID。|
|payload|PushPayload|是|无|需要设置的 PushPayload 对象。|

#### getScheduleList(page)
获取有效的定时任务列表。

|参数|类型|必须|默认值|说明|
|-----|-----|-----|-----|-----|
|page|int|是|无|请求页的页数，每页最多返回 50 个，如果请求页页数大于总页数，则 schedule 为空。|

#### getSchedule(scheduleID)
获取指定的定时任务信息。

|参数|类型|必须|默认值|说明|
|-----|-----|-----|-----|-----|
|scheduleID|string|是|无|指定的定时任务 ID。|

#### delSchedule(scheduleID)
删除指定的定时任务。

|参数|类型|必须|默认值|说明|
|-----|-----|-----|-----|-----|
|scheduleID|string|是|无|指定的定时任务 ID。|

----------

### PushPayload

单次推送的对象，由 JPushClient 创建。

该类包含的方法有：

|函数|说明|
|-----|-----|
|setPlatform|设置 platform，本方法接收 `JPush.ALL`, `android`, `ios`, `android`这几个参数.具体使用可参考 Platform 示例。 |
|setAudience|设置 audience，本方法接收 `JPush.ALL`，或者是 `tag()`,  `tag_and()`, `alias()`, `registration_id()` 创建的对象，具体可参考 Audience 示例。|
|setNotification|设置 notification，本方法接收 `ios()`, `android()`, `winphone()`等方法创建的对象，如果第一个参数为字符串，则指定全局的 alert，具体可参考 Notification 示例。|
|setMessage|设置 message，本方法接受 4 个参数`msg_content(string,必填)`, `title(string)`, `content_type(string)`, `extras(Object)`。|
|setOptions|设置 options，本方法接收 5 个参数，`sendno(int)`, `time_to_live(int)`, `override_msg_id(int)`, `apns_production(boolean)`, `big_push_duration(int)`。|
|toJSON|将当前 payload 对象转换为 json 字符串。|
|send|推送当前 payload 对象。|
|isIosExceedLength|检测当前 payload 是否超出 iOS notification 长度限定，返回 true / false（iOS Notification 不超过 220 并且 iOS notification + message 不超过 1200）。|
|isGlobalExceedLength|检测当前 payload 是否超出长度限定，返回 true / false（iOS Notification 不超过 220 并且所有平台的 notification + message不超过1200）。|
|setSingleSchedule|配置简单的定时任务，参数为形如 'YYYY-MM-DD HH:MM:SS' 的字符串。|
|setPeriodicalSchedule|配置较复杂的定期任务，参数包括 `startDate(string)`, `endDate(string)`, `time(string)`, `timeUnit(string)`, `frequency(int)`, `point(string array)`，具体参数用法可参照[官方文档](http://docs.jiguang.cn/server/rest_api_push_schedule/#schedule_1)。|
|setSchedule|向服务器提交设置的定时任务。参数：`name(string)`, `enabled(boolean)`。|
|updateSchedule|向服务器请求更新指定的定期任务。参数：`id(string)`, `name(string)`, `enabled(boolean)`。|

开发者可以参考[推送示例][2]快速了解推送细节和[定时任务示例](/examples/ScheduleExample.js)了解定时任务细节。


### Platform 示例
```javascript
client.push().setPlatform(JPush.ALL) // 指定推送给所有平台。
client.push().setPlatform('ios', 'android') // 推送特定平台，参数排序不分先后。
```

### Audience 示例
以下示例最终都构建`{"audience":{"tag":["555","666"]}}`，开发者可以根据具体应用场景选择合适的设值方法。  
同理，`tag_and()`, `alias()`, `registration_id()` 都可以使用以下方法设置：
```javascript
client.push().setAudience(JPush.tag('tag1', 'tag2'))
client.push().setAudience(JPush.tag('tag1,tag2'))
client.push().setAudience(JPush.tag(['tag1', 'tag2']))
```
当需要同时设置不同属性的audience的时候,参数的排列不分先后
```javascript
client.push().setAudience(JPush.tag('tag1', 'tag2'), JPush.alias('alias1', 'alias2'))
```

### Notification 示例
```javascript
client.push().setNotification('Hi, JPush') // 设置全局的 alert。

// 设置特定平台 notification。
client.push().setNotification(
    JPush.android('Hi,JPush', 'JPush Title', 1, {'key':'value'}),
    JPush.ios('Hi, JPush', 'sound', 1))

// 同时设置全局 alert 与特定平台 notification。
client.push().setNotification('Hi, JPush',
    JPush.android('Hi,JPush', 'JPush Title', 1, {'key':'value'}),
    JPush.ios('Hi, JPush', 'sound', 1))
```

  [1]: http://docs.jpush.cn/display/dev/Push-API-v3
  [2]: https://github.com/jpush/jpush-api-nodejs-client/blob/master/examples/PushExample.js
