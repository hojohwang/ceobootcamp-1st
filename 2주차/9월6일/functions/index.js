const functions = require("firebase-functions");
let admin = require("firebase-admin");
const cors = require("cors")({origin:true});

let serviceAccount = require("./ceohojocamp19970906try-firebase-adminsdk-2bhsg-5377da94fd");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ceohojocamp19970906try-default-rtdb.firebaseio.com"
});

let db = admin.database();








exports.helloWorld = functions.https.onRequest((request, response) => {
  cors(request, response, ()=>{
    db.ref("msgs").on("value", (snapshot)=>{
      response.send(snapshot.val());
      });
    })
  });
