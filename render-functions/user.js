const express = require('express');
const { getDocumentById } = require('../services/userFunction'); // Adjust path based on your structure
const { db } = require('../firebase'); // Adjust to your Firebase setup

const app = express();

// User API to get document
app.get('/document/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const document = await getDocumentById('documents', id); // Assuming this is fetching from Firestore
        if (document) {
            res.json(document);
        } else {
            res.status(404).json({ error: 'Document not found' });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Start Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

