const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// いいねボタンのクリックをトリガーにして実行
exports.likeCounter = functions.database.ref('/like/liked/{buttonId}/{userName}')
    .onWrite(( change, context ) => {
                
        // 送信されてきた値を取得
        const input = change.after.val();

        // ボタンIDを取得
        const buttonId = context.params.buttonId;

        var db = firebase.database();
        if (location.hostname === "localhost") {
            // Point to the RTDB emulator running on localhost.
            db.useEmulator("localhost", 9000);
        } 

        // 増減させるデータベースのパス
        const path = '/like/count/' + buttonId;
        // 増減させるパスへの参照を作成
        const ref = change.after.ref.root.child(path);

        // 増減させるパスの値（いいねカウント数）を取得
        return ref.once('value').then( snap => {
            var val = snap.val(); // 現在のカウント
            if( !val ) val = 0; // 存在しないときは0

            // inputにはDBに書き込まれた値が入っている
            if( input === 1 ) {
                // 1が書き込まれた（いいね）ときは増やす
                return ref.set( val + 1 );
            }else{
                // 0が書き込まれた（解除）ときは減らす
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