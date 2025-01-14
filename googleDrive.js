const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

require('dotenv').config();

const serviceKey=JSON.parse(process.env.DRIVE_KEY);

// Authenticate with the service account JSON key
const auth = new google.auth.GoogleAuth({
  credentials:serviceKey, // Path to your JSON key file
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({ version: 'v3', auth });

module.exports = drive;


