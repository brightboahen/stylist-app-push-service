/**
 * Created by brightdarkoboahen on 21/03/2017.
 */

'use strict';

const gcm = require('node-gcm');

let GcmClient = function(){};

GcmClient.prototype.send = function(token){

    return new Promise((resolve, reject) => {
        // Set up the sender with your GCM/FCM API key (declare this once for multiple messages)
        let sender = new gcm.Sender('AAAAIdJTYAw:APA91bF7bHisu-6vjOJEM6ANnKQDqeLbphdtzscuPtQ1iWavIYSRRkkvxf92shaoPHNpQfYht3XCMpddJr9NbHMBaBuMeMylz4G-EezV5D2vfhN6wBSFO6KctVrd8FBwX8oXLKyH5yWS');

        // Prepare a message to be sent
        let message = new gcm.Message({
            data: { key1: 'There is a job now accept!' }
        });

        // Specify which registration IDs to deliver the message to
        let regTokens = [token];

        // Actually send the message
        sender.send(message, { registrationTokens: regTokens }, function (err, response) {
            if(err){
                console.error(err);
                reject(err);
            }else{
                console.log(response);
                resolve(response);
            }
        });
    });
};

module.exports = new GcmClient();
