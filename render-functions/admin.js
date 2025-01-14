const express = require('express');
const { addDoc } = require('../../services/adminFunction'); // Adjust path based on your structure
const { db } = require('../firebase'); // Adjust to your Firebase setup

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Admin API to upload document
app.post('/admin/upload', async (req, res) => {
    const { collectionName, data, adminId } = req.body;

    try {
        const docId = await addDoc(collectionName, data, adminId); // Adjust this as per your function
        res.json({ message: 'Document added successfully', docId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

