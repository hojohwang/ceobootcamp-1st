const functions = require("firebase-functions");

let admin = require("firebase-admin");
let serviceAccount = require("./ceohojocamp19970906try-firebase-adminsdk-2bhsg-5377da94fd");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ceohojocamp19970906try-default-rtdb.firebaseio.com"
});

let db = admin.database();
let ref = db.ref("restricted_access/secret_document");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});






exports.helloWorld = functions.https.onRequest((request, response) => {
  db.ref("msgs").on("value", (snapshot)=>{
    response.send(snapshot.val());
    });
  });
