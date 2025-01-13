const {auth,db}=require('../firebase');

const admin=require('firebase-admin');

const express=require('express');

const router=express.Router();



//register api

router.post('/register', async(req, res) =>{
    const {email,password,name}=req.body;
    try {
        const userRecord=await auth.createUser({email:email,password:password,displayName:name});
        await db.collection('users').doc(userRecord.uid).set({email:userRecord.email,displayName:userRecord.name,createdAt:admin.firestore.FieldValue.serverTimeStamp()});
        res.status(201).json({message:'user registration successful',userId:userRecord.uid});

    }
    catch (err) {
        console.error('error registering user:',err);
        res.status(500).json({error:err.message});
    }
});

//login api

router.post('/login',async(req, res) =>{
    const {idToken}=req.body;
    try {
        const decodedToken=await auth.verifyIdToken(idToken);
        const userId=decodedToken.uid;
        
        

        res.status(200).json({message:'login successful',userId: userId,userDetails:decodedToken});



    } catch (err) {
        console.error('error verifying id token:',err.message);
        res.status(401).json({error:'error verifying id token:'});
    }
    
    
});

module.exports=router;