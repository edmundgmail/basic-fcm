const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.onReceiveLocation = functions.database.ref('locations/{mbusid}/{location}').onWrite(event => {
     const mbusid= event.params.mbusid;
     //console.log("mbusid=" + mbusid);
     //console.log("event.data="+ JSON.stringify(event.data));

     const payload = {
        notification: {
            body: JSON.stringify(event.data),
        }
    };

    admin.messaging().sendToTopic(mbusid, payload).then(response => {
        /*response.results.forEach((result, index) => {
        const error = result.error;
        if (error) {
            console.error('Failure sending notification to' + error);
        }
        });*/
     console.log("response=" + JSON.stringify(response));
    });
});
