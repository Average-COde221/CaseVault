const {db} = require('../firebase');

const addDoc= async (collectionName,data,AdminId) => {

    const docRef = await db.collection(collectionName).doc(); //auto-generate new id
    const newData={
        ...data,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        createdBy: adminId
    };

    await docRef.set(neewData);
    return docRef.id;
};

module.exports = addDoc;