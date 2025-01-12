const fs=require('fs');
const readline=require('readline');
const {db}=require('./firebase');

//function to upload jsonl dataset


async function uploadJsontoFirestore(filepath,collectionName){
    const filestream=fs.createReadStream(filepath);
    const rl=readline.createInterface({input:filestream,crlfDelay:0});
    let count=0;
    for await (const line of rl){
        if(line.trim()){
            try{
                const data=JSON.parse(line) //parse each line into json object
                if(!data.case_id){
                    console.error("missing id",line);
                    continue; //skip if id is missing
                }
                const docRef=db.collection(collectionName).doc(data.case_id);
                await docRef.set(data); //upload document
                count++;
            }

            catch(error){
                console.error("failed to process line",line,"error:",error);
            }
        }
    }


    console.log("${count} document uploaded to ${collectionName}");
}

//call the function with your dataset path and collection name

const filePath='./Data/train.jsonl';
const collectionName='LegalDocuments';
uploadJsontoFirestore(filePath, collectionName);
    try {
        console.log("upload complete");
        
    } catch (error) 
    {
        console.error('error uploading file',error);
    }