const axios = require('axios');

/**
 * check the existence of all paramsList (as string separated by ",") in the object obj
 * @param {*} msg 
 * @param {*} paramList 
 */
var checkparams = function (obj, paramList) {
    var pArr = paramList.split(",");
    for (let index = 0; index < pArr.length; index++) {
        const element = pArr[index];
        if (!obj.hasOwnProperty(element)) {
            return false // return false if any param is not defined inside the object "msg"
        }
    }
    return true // all parameters exists
}

/**
 * FORK FROM faas_utils
 * event_save: a call to an event function that saves data, can be a webhook or an openfaas 
 * @param {*} data   
 */
var event_save = async function (events_url, data) {
    try {
        var config = {
            method: 'post',
            url: events_url,
            headers: {
                // 'Auth-Token': "",
                'Content-Type': 'application/json'
            },
            data: data
        };
        var event_result = await axios(config);
        // console.log(event_result)
        return event_result.data
    } catch (error) {
        return {
            "status": "error",
            "message": error
        }
    }
}

module.exports = {
    checkparams: checkparams,
    event_save: event_save
}