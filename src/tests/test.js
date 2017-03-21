/**
 * Created by brightdarkoboahen on 17/03/2017.
 */

const request = require('request');

var options = {
    method :'post',
    body : {
        deviceToken  : 'c20cbefda1f839ca429cd82e10add18f2ef6ff341d171b2e0d09cfe9dc7dabd6',
        deviceType : 1
    },
    json: true,
    url : 'https://i1h9e28ff4.execute-api.eu-west-2.amazonaws.com/dev/stylist/push'
};

var options2 = {
    method :'post',
    body : {
        deviceToken  : 'fS8CnyL0QUk:APA91bEfjfkVB7Jo5l_iUUFkfS3A2OiUcM73Cy86qrBeoP6tFWQJsVyzSWnQTOvmjxx8ZpRxr8zrb9FDFXDS8-LZ4tl26AMK0j48UcHV5F6p4piOO-9Gpj01K06VKdMj9MVa7max6c6H',
        deviceType : 2
    },
    json: true,
    url : 'https://i1h9e28ff4.execute-api.eu-west-2.amazonaws.com/dev/stylist/push'
};

request(options2, function(err, response, body){
    if(err !== null){
        console.log(err,'--errors ');
    }
    //console.log(response,'--response');
    //console.log(body,' -- body');
});