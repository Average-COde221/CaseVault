const express=require('express');
const {getDocumentbyId}=require('../services/userFunction');
const functions=require('firebase-funcions');

const app=express();

//user api to get document

app.get('/document/:id', async (req,res) => {

    const {id}=req.params;

    try{
        const document=await getDocumentById('documents',id);
        if(document){
            res.json(document);
        }
        else{
            res.status(404).json({error:'document not found'});
        }

    }

    catch(e){
        res.status(500).json({error:error.message});
    }
    
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//exports.api=functions.https.onRequest(app);