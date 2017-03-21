'use strict';

var apn = require('apn');

var options = {
    token: {
        key: "./apns.p8",
        keyId : 'PK2PDL985C',
        teamId : 'ZL4RFLK26U'
    },
    production: false
};

var apnProvider = new apn.Provider(options);

var GcmClient = require('./src/GcmClient');

//const PushNotificationClient = require('./src/pushNotificationClient.js').PushClient;

module.exports.pushNotificationToTechWithToken = (event, context, callback) => {

    console.log(event);
    context.callbackWaitsForEmptyEventLoop = false;

    const eventObject = JSON.parse(event.body);

    try {
        const deviceToken = eventObject.deviceToken;
        const deviceType = eventObject.deviceType;

        console.log('PushClient received this token', deviceToken);
        console.log('PushClient received this device type', deviceType);

        if(deviceType === 1){
            if(deviceToken !== '' || deviceToken !== undefined){
                //const deviceType = (deviceType !== undefined || deviceType !=='' ) ? deviceType : 1;
                sendNotification(deviceToken)
                    .then( (results) => {
                        console.log('results', results);
                        const sent = results.sent;
                        const failed = results.failed;
                        if(sent && sent.length >= 1){
                            sent.map( s => console.log('sent notification to ',s.device+' on '+new Date().toLocaleString()));
                        }
                        if(failed && failed.length >= 1){
                            failed.map( f => console.log('failed to send notification to ',f.device+' on '+new Date().toLocaleString()));
                        }
                        apnProvider.shutdown();
                        const response = {
                            statusCode : 200,
                            body: JSON.stringify({
                                message : 'Push Client executed successfully!'
                            })
                        };
                        callback(null,response);
                    })
            }else {
                const response = {
                    statusCode: 301,
                    body: JSON.stringify({
                        message: 'Check device Token param',
                        payload: event.params,
                    }),
                };
                callback(null,response);
            }
        }else{
            let token;
            if(deviceToken === ''){
                token = 'fS8CnyL0QUk:APA91bEfjfkVB7Jo5l_iUUFkfS3A2OiUcM73Cy86qrBeoP6tFWQJsVyzSWnQTOvmjxx8ZpRxr8zrb9FDFXDS8-LZ4tl26AMK0j48UcHV5F6p4piOO-9Gpj01K06VKdMj9MVa7max6c6H';
            }else{
                token = deviceToken;
            }
            GcmClient.send(token)
                .then( () => {
                    const response = {
                        statusCode : 200,
                        body: JSON.stringify({
                            message : 'Push Client executed successfully!'
                        })
                    };
                    callback(null,response);
                })
                .catch( (error) => {
                    const response = {
                        statusCode: 301,
                        body: JSON.stringify({
                            message: error,
                            payload: event.params,
                        }),
                    };
                    callback(null,response);
                });
        }
    }catch (e){
        const response = {
            statusCode: 501,
            body: JSON.stringify({
                message: 'Type Error',
                payload: 'Server could not validate request object',
            }),
        };
        callback(null,response);
    }


    function sendNotification(deviceToken){
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
    }


    //console.log(PushNotificationClient, 'Notification Client');

    // const response = {
    //           statusCode: 200,
    //           body: JSON.stringify({
    //             message: 'Check device Token param',
    //             payload: event.params,
    //           }),
    //         };
    //
    // callback(null,response);

  // const deviceToken = event.payload.token || event.params.deviceToken;
  // const deviceType = event.payload.deviceType || event.params.deviceType;
  //
  // console.log('PushClient received this token', deviceToken);
  // console.log('PushClient received this device type', deviceType);
  //
  // if(deviceToken !== '' || deviceToken !== undefined){
  //   const deviceType = (deviceType !== undefined || deviceType !=='' )? deviceType : 1;
  //   PushNotificationClient.send(deviceToken,deviceType)
  //       .then( (results) => {
  //           const sent = results.sent;
  //           const failed = results.failed;
  //           if(sent && sent.length >= 1){
  //               sent.map( s => console.log('sent notification to ',s.device+' on '+new Date().toLocaleString()));
  //           }
  //           if(failed && failed.length >= 1){
  //               failed.map( f => console.log('failed to send notification to ',f.device+' on '+new Date().toLocaleString()));
  //           }
  //           const response = {
  //               statusCode : 200,
  //               body: JSON.stringify({
  //                 message : 'Push Client executed successfully!'
  //               })
  //           };
  //
  //           callback(null,response);
  //       });
  // }else {
  //     const response = {
  //       statusCode: 301,
  //       body: JSON.stringify({
  //         message: 'Check device Token param',
  //         payload: event.params,
  //       }),
  //     };
  //     callback(null,response);
  // }
};
