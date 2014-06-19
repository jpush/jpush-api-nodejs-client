var JPush = require("../lib/JPush.js");


/*
try {
    var client = JPush.buildClient('appkey', 'masterSecret');
} catch(e) {
    console.log(e.toString());
}
*/

//var client = JPush.buildClient('appkey', 'masterSecret');
try {
    var client = JPush.buildClient('appkey', 'masterSecret');
} catch(e) {
     if (e instanceof  JPush.APIConnectionError) {
        console.log('APIConnectionError');
    } else if (e instanceof  JPush.APIRequestError) {
        console.log('APIRequestError');
    } else if (e instanceof JPush.InvalidArgumentError) {
        console.log('InvalidArgumentError');
    }
}