var JPush = require("jpush-sdk");

var client = JPush.buildClient('dd1066407b044738b6479275', '6b135be0037a5c1e693c3dfa');

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
        console.log("updateDeviceTagAlias :" + res);
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
