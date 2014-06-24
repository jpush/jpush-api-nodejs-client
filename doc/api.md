# JPush Api Nodejs client doc

## 整体描述
本SDK提供JPush服务端接口的Node封装，与 [JPush Rest API][1]  组件通信。使用时引用该模块即可，可参考附带Demo学习使用方法。

## 公共类型定义

函数：

|函数|说明|
|-----|-----|
|tag|创建audience的tag属性,使用方法请参考Audience示例|
|tag_and|创建audience的tag_and属性,使用方法请参考Audience示例|
|alias|创建audience的alias属性,使用方法请参考Audience示例|
|registration_id|创建audience的reigistration属性,使用方法请参考Audience示例|
|ios|创建ios notification,接收5个参数,alert,sound,badge,contentAvailable,extras|
|android|创建android notification|
|winphone|创建winphone notification|

**ios(alert,sound,badge,contentAvailable,extras)**  

创建ios notification

|参数|类型|必须|默认值|说明|
|-----|-----|-----|-----|-----|
|alert|string|是|无|通知内容|
|sound|string|否|''|通知提示声音，''为默认声音，指定为JPush.DISABLE_SOUND不使用提示声 |
|badge|int|否|1|把角标数字改为指定的数字；为 0 表示清除。|
|contentAvailable|boolean|否|无|是否静默推送|
|extras|object|否|无|自定义 Key/value 信息，以供业务使用|

**android(alert,title,builder_id,extras)**

|参数|类型|必须|默认值|说明|
|-----|-----|-----|-----|-----|
|alert|string|是|无|通知内容|
|title|string|否|无|通知标题|
|builder_id|int|否|无|Android SDK 可设置通知栏样式，这里根据样式 ID 来指定该使用哪套样式 |
|extras|object|否|无|自定义 Key/value 信息，以供业务使用|

**winphone(alert,title,openPage,extras)**

|参数|类型|必须|默认值|说明|
|-----|-----|-----|-----|-----|
|alert|string|是|无|通知内容|
|title|string|否|无|通知标题|
|openPage|string|否|无|点击打开的页面。会填充到推送信息的 param 字段上，表示由哪个 App 页面打开该通知。可不填，则由默认的首页打开 |
|extras|object|否|无|自定义 Key/value 信息，以供业务使用|

常量

|字段名|说明|
|-----|-----|
|ALL|设置audience与platform为推送全部对象时使用|

类

|类名|说明|
|-----|-----|
|APIConnectionError|网络原因使请求失败时候抛出的异常|
|APIRequestError|推送失败时抛出的异常，携带服务器返回的失败提示|
|InvalidArgumentError|参数错误抛出的异常|
|JPushClient|推送客户端，是所有API调用的对外接口|
|PushPayload|推送对象|



----------


### JPushClient  

JPush API Client，调用该类的实例执行对JPush API的请求  

构建方法  

**JPush.buildClient(appkey, masterSecret, retryTimes)**  

|参数|类型|必须|默认值|说明|
|-----|-----|-----|-----|-----|
|appKey|string|是|无|开发者appKey，可从JPush Portal获取|
|masterSecret|string|是|无|开发者masterSecret，可从JPush| Portal获取|
|retryTimes|int|否|5|请求失败重试次数|

该类包含的接口有：

#### push()

创建推送对象PushPayload,每次推送创建一个推送对象

#### sendPush(payload, callback)

推送payload对象到JPush服务器上，该方法由PushPayload.send()调用，建议不要主动调用此函数

|参数|类型|必须|默认值|说明|
|-----|-----|-----|-----|-----|
|payload|PushPayload|是|无|需要推送的PushPayload对象|
|callback(err， res)|function|是|无|推送后的回调函数，第一个参数是错误对象，属于APIConnectionError,APIRequestError之一，正常时为NULL，第二个参数是推送成功返回的对象 |

推送成功后，callback中的res对象： 

|字段名|类型|说明|
|-----|-----|-----|
|sendno|int|纯粹用来作为 API 调用标识，API 返回时被原样返回，以方便 API 调用方匹配请求与返回|
|msg_id|int|标识每一次推送的唯一的ID|


#### getReportReceiveds(msg_ids, callback)

获取对应msg_id的返回报告，多个msg_id用逗号连接起来，中间不要有空格

|参数|类型|必须|默认值|说明|
|-----|-----|-----|-----|-----|
|msg_ids|string|是|无|需要获取的msg_id，多个msg_id用逗号连接起来，中间不要有空格|
|callback(err， res)|function|是|无|推送后的回调函数，第一个参数是错误对象，属于APIConnectionError,APIRequestError之一，正常时为NULL，第二个参数是推送成功返回的对象 |

推送成功后，callback中的res对象是一个数组，代表获取的每一个对象的Report： 

|字段名|类型|说明|
|-----|-----|-----|
|android_received |int|Android 送达。如果无此项数据则为 null|
|ios_apns_sent |int| IOS 推送成功。如果无此项数据则为 null|
|msg_id|int|该report对应的msg_id|


----------


### PushPayload

单次推送的对象，由JPushClient创建

该类包含的方法有：

|函数|说明|
|-----|-----|
|setPlatform|设置platform,本方法接收 `JPush.ALL`, `android`, `ios`, `android`这几个参数.具体使用可参考 Platform示例 |
|setAudience|设置audience,本方法接收 `JPush.ALL`，或者是`tag()`,  `tag_and()`, `alias()`, `registration_id()` 创建的对象，具体可参考Audience示例|
|setNotification|设置notification，本方法接收 `ios()`, `android()`, `winphone()`等方法创建的对象，如果第一个参数为字符串，则指定全局的alert，具体可参考Notification示例|
|setMessage|设置message，本方法接受4个参数`msg_content(string,必填)`, `title(string)`, `content_type(string)`, `extras(Array)`|
|setOptions|设置options,本方法接收4个参数，`sendno(int)`, `timeToLive(int)`, `overrideMsgId(int)`, `apnsProduction(boolean)`|
|toJSON|将当前payload对象转换为json字符串|
|send|推送当前payload对象| 

开发者可以参考 [推送示例][2] 快速了解推送细节

### Platform 示例
```javascript
client.push().setPlatform(JPush.ALL);//指定推送给所有平台
client.push().setPlatform('ios', 'android');//推送特定平台，参数排序不分先后
```

### Audience示例
以下示例最终都构建`{"audience":{"tag":["555","666"]}}`。开发者可以根据具体应用场景选择合适的设值方法。  
同理，`tag_and()`, `alias()`, `registration_id()` 都可以使用以下设置方法
```javascript
client.push().setAudience(JPush.tag('tag1', 'tag2'));
client.push().setAudience(JPush.tag('tag1,tag2'));
client.push().setAudience(JPush.tag(['tag1', 'tag2']));
```
当需要同时设置不同属性的audience的时候,参数的排列不分先后
```javascript
client.push().setAudience(JPush.tag('tag1', 'tag2'), JPush.alias('alias1', 'alias2'));
```

### Notification 示例
```javascript
client.push().setNotification('Hi, JPush');//设置全局的alert
//设置特定平台notification
client.push().setNotification(
    JPush.android('Hi,JPush', 'JPush Title', 1, {'key':'value'}),
    JPush.ios('Hi, JPush', 'sound', 1));
//同时设置全局alert与特定平台notification
client.push().setNotification(
    'Hi, JPush',
    JPush.android('Hi,JPush', 'JPush Title', 1, {'key':'value'}),
    JPush.ios('Hi, JPush', 'sound', 1));
```


  [1]: http://docs.jpush.cn/display/dev/Push-API-v3
  [2]: .../example/PushExample.js