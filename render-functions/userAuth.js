const express = require('express');
const { auth, db } = require('../firebase'); // Adjust import to your Firebase setup
const app = express();
app.use(express.json());

const cors=require("cors");

app.use(cors());

// Register API
const register = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const userRecord = await auth.createUser({ email, password, displayName: name });
        await db.collection('users').doc(userRecord.uid).set({
            email: userRecord.email,
            displayName: userRecord.displayName,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        return res.status(201).json({
            message: 'User registration successful',
            userId: userRecord.uid
        });
    } catch (err) {
        console.error('Error registering user:', err);
        return res.status(500).json({ error: err.message });
    }
};

// Login API
const login = async (req, res) => {
    const { idToken } = req.body;
    try {
        const decodedToken = await auth.verifyIdToken(idToken);
        const userId = decodedToken.uid;

        return res.status(200).json({
            message: 'Login successful',
            userId,
            userDetails: decodedToken
        });
    } catch (err) {
        console.error('Error verifying ID token:', err.message);
        return res.status(401).json({ error: 'Error verifying ID token' });
    }
};

// Route handler
app.post('/auth', async (req, res) => {
    const { action } = req.body;
    
    if (action === 'register') {
        return register(req, res);
    } else if (action === 'login') {
        return login(req, res);
    } else {
        return res.status(400).json({ error: 'Invalid action' });
    }
});

// Start Express server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
