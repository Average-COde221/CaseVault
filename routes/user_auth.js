const {auth,db}=require('../firebase');

const express=require('express');

const router=express.Router();

router.use(express.json());

//register api

router.post('/register', async(req, res) =>{
    const {email,password,name}=req.body;
    try {
        const userRecord=await auth.createUser({email:email,password:password,displayName:name});
        await db.collection('users').doc(userRecord.user_id).set({email:userRecord.email,displayName:userRecord.name,createdAt:admin.firestore.FieldValue.serverTimeStamp()});
        res.status(201).json({message:'user registration successful',userId:userRecord.user_id});

    }
    catch (err) {
        console.error('error registering user:',err);
        res.status(500).json({error:err.message});
    }
});

//login api

router.post('/login',async(req, res) =>{
    const {email,password}=req.body;
    try {
        const user=await auth.signInWithEmailAndPassword(email,password);
        if (!userRecord){
            res.status(404).json({error:'user not found'});
        }
        
        const customToken= await auth.createCustomToken(userRecord.user_id);

        res.status(200).json({message:'login successful',token:customToken});


    } catch (err) {
        console.error('error logging in user:',err);
        res.status(400).json({error:err.message});
    }
    
    
});

module.exports=router;