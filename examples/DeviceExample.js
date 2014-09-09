var JPush = require("../lib/JPush/JPush.js");

var client = JPush.buildClient('47a3ddda34b2602fa9e17c01', 'd94f733358cca97b18b2cb98');

client.getDeviceTagAlias('0900e8d85ef', function(err, res) {
    if (err) {
        if (err instanceof JPush.APIConnectionError) {
            console.log(err.message);
        } else if (err instanceof JPush.APIRequestError) {
            console.log(err.message);
        }
    } else {
        console.log("getDeviceTagAlias :");
        console.log(res.alias);
        console.log(res.tags);
    }
});
tagsToAdd = ['tag1', 'tag2'];
tagsToRemove = ['tag3', 'tag4'];
client.updateDeviceTagAlias('0900e8d85ef', 'alias1', false, tagsToAdd, tagsToRemove, function(err, res) {
    if (err) {
        if (err instanceof JPush.APIConnectionError) {
            console.log(err.message);
        } else if (err instanceof JPush.APIRequestError) {
            console.log(err.message);
        }
    } else {
        console.log("updateDeviceTagAlias :");
        console.log('success');
    }
});

client.getTagList(function(err, res) {
    if (err) {
        if (err instanceof JPush.APIConnectionError) {
            console.log(err.message);
        } else if (err instanceof JPush.APIRequestError) {
            console.log(err.message);
        }
    } else {
        console.log("getTagList :");
        console.log('got result:' + res.tags);
    }
});

client.isDeviceInTag('tag3', '0900e8d85ef', function(err, res) {
    if (err) {
        if (err instanceof JPush.APIConnectionError) {
            console.log(err.message);
        } else if (err instanceof JPush.APIRequestError) {
            console.log(err.message);
        }
    } else {
        console.log("isDeviceInTag :");
        console.log('got result:' + res['result']);
    }
});

toAddUsers = ['0900e8d85ef'];
toRemoveUsers = ['0900e8d85ef'];
client.addRemoveDevicesFromTag('tag1', toAddUsers, toRemoveUsers, function(err, res) {
    if (err) {
        if (err instanceof JPush.APIConnectionError) {
            console.log(err.message);
        } else if (err instanceof JPush.APIRequestError) {
            console.log(err.message);
        }
    } else {
        console.log('success');
    }
});

client.deleteTag('tag1', null, function(err, res) {
    if (err) {
        if (err instanceof JPush.APIConnectionError) {
            console.log(err.message);
        } else if (err instanceof JPush.APIRequestError) {
            console.log(err.message);
        }
    } else {
        console.log("deleteTag :");
        console.log('success');
    }
});

client.getAliasDeviceList('alias1', null, function(err, res) {
    if (err) {
        if (err instanceof JPush.APIConnectionError) {
            console.log(err.message);
        } else if (err instanceof JPush.APIRequestError) {
            console.log(err.message);
        }
    } else {
        console.log("getAliasDeviceList :");
        console.log(res.registration_ids);
    }
});



client.deleteAlias('alias2', null, function(err, res) {
    if (err) {
        if (err instanceof JPush.APIConnectionError) {
            console.log(err.message);
        } else if (err instanceof JPush.APIRequestError) {
            console.log(err.message);
        }
    } else {
        console.log("deleteAlias :");
        console.log('success');
    }
});
