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


  exports.join = functions.https.onRequest((request, response) => {
    cors(request, response, ()=>{
      let id = request.body.id;
      let pwd = request.body.pwd;
      db.ref("members/"+id).set(pwd);
      });
    });

    exports.login = functions.https.onRequest((request, response) => {
      cors(request, response, ()=>{

        let id = request.body.id;
        let pwd = request.body.pwd;
        db.ref("members/"+id).on("value", (snapshot)=>{
          if(snapshot.val()){
            if(snapshot.val() == pwd){
              response.send({"result":"로그인 되었습니다."});
            }else{
              response.send({"result":"비밀번호가 일치하지 않습니다."});
            }
          }else{
            response.send({"result":"가입되지 않은 회원입니다."});
          }

        });
      });
    });
