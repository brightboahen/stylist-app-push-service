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

request(options, function(err, response, body){
    console.log(err,'--errors ');
    console.log(response,'--response');
    console.log(body,' -- body');
});