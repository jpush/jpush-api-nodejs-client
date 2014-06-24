# JPush Api Nodejs client doc

## 整体描述
本SDK提供JPush服务端接口的Node封装，与 [JPush Rest API][1]  组件通信。使用时引用该模块即可，可参考附带Demo学习使用方法。

## 公共类型定义

### JPushClient  

JPush API Client，调用该类的实例执行对JPush API的请求  

构建方法  

JPush.buildClient(appkey, masterSecret, retryTimes)  

参数|类型|必须|默认值|说明
 ------ | ------ | ------| ------
appKey|string|是|无|开发者appKey，可从JPush Portal获取
masterSecret|string|是|无|开发者masterSecret，可从JPush Portal获取
retryTimes|int|否|5|请求失败重试次数



  [1]: http://docs.jpush.cn/display/dev/Push-API-v3