const firebase=require("firebase-admin");
require('dotenv').config();

const serviceAcc=JSON.parse(process.env.FIREBASE_KEY);

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAcc),
    
});

const db=firebase.firestore();
const auth=firebase.auth();
module.exports ={firebase,db,auth};

