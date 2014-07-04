var JPush = require("../lib/JPush/JPush.js");

var client = JPush.buildClient('47a3ddda34b2602fa9e17c01', 'd94f733358cca97b18b2cb98');

client.getReportReceiveds('746522674,344076897', function(err, res) {
    if (err) {
        if (err instanceof JPush.APIConnectionError) {
            console.log(err.message);
            //Response Timeout means your request to the server may have already received, please check whether or not to push
            console.log(err.isResponseTimeout);
        } else if (err instanceof  JPush.APIRequestError) {
            console.log(err.message);
        }
    } else {
        for (var i=0; i<res.length; i++) {
            console.log(res[i].android_received);
            console.log(res[i].ios_apns_sent);
            console.log(res[i].msg_id);
            console.log('------------');
        }
    }
});