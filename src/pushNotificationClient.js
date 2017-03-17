/**
 * Created by brightdarkoboahen on 17/03/2017.
 */

'use strict';

var apn = require('apn');

var options = {
    token: {
        key: "./src/apns.p8",
        keyId : 'PK2PDL985C',
        teamId : 'ZL4RFLK26U'
    },
    production: false
};

var apnProvider = new apn.Provider(options);

var PushNotificationClient = function(){};

PushNotificationClient.prototype.send = function(deviceToken, deviceType=1){
    //We have a token string to push to
    if(deviceToken !== ''){
        //The device is an ios device
        if(deviceType === 1){
            return new Promise(function(resolve, reject){
                var note = new apn.Notification();
                //note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
                note.badge = 1;
                note.sound = "ping.aiff";
                note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
                note.payload = {'messageFrom': 'BlowLTD'};
                note.topic = "com.dharmash.blowLTDPortal";

                apnProvider.send(note, deviceToken).then( function(result){
                    // see documentation for an explanation of result
                    //console.log(result);
                    resolve(result);
                }).catch(function(error){
                    reject(error);
                });
            })
        }else{
            //The device is an android device
        }
    }
};

exports.PushClient = new PushNotificationClient();

//const pushObj = new PushNotificationClient();

//console.log(__dirname);

//let token = 'c20cbefda1f839ca429cd82e10add18f2ef6ff341d171b2e0d09cfe9dc7dabd6';

//pushObj.send(token,1).then( () => { console.log('done well')});