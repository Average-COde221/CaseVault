const functions=require('firebase-functions');
const express = require("express");
const {addDoc}=require("../services/adminFunction");

const app=express();

app.post('/admin/upload',async (req, res) => {
    const {collectionName,data,adminId}=req.body;
    try {
        const docId= await addDoc(collectionName,data,adminId);
        res.json({message:'Document added successfully'},docId);

    } catch(error){
        res.status(500).json({error:error.message});
    }
});

exports.api=functions.https.onRequest(app);