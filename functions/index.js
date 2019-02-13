const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.likeCounter = functions.database.ref('/like/liked/{buttonId}/{userName}')
    .onWrite(( change, context ) => {
        const buttonId = context.params.buttonId;
        // const userName = context.params.userName;

        var path = '/like/count/' + buttonId;
        var ref = change.after.ref.root.child(path);
        var input = change.after.val();

        // console.log(path);
        // console.log(buttonId);

        // var val;
        return ref.once('value').then( snap => {
            var val = snap.val();
            if( !val ) val = 0;
            if( input === 1 ) {
                return ref.set( val + 1 );
            }else{
                return ref.set( val - 1 );
            }
        });

    });


// exports.likeCounterC = functions.firestore
//     .document('liked/{buttonID}')
//     .onWrite((change, context) => {
//         // Get an object with the current document value.
//         // If the document does not exist, it has been deleted.
//         const document = change.after.exists ? change.after.data() : null;
//         console.log(document);
//         console.log(context.params.buttonID);

//         const cntRef = change.after.ref.firestore.collection("count").doc();
//         var val = cntRef.get().then( (doc) => {
//             if (doc.exists) {
//                 console.log(doc.data());
//             }
//             return doc.data();
//         }).catch( (error) => {
//             console.log("Error getting document:", error);
//         });

//         // Get an object with the previous document value (for update or delete)
//         // const oldDocument = change.before.data();
//         // console.log(oldDocument);
//         // perform desired operations ...
//     });