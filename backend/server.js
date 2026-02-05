const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// 1. Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// 2. Status Route
app.get('/', (req, res) => {
    res.send('Spotify Stats Backend is Running!');
});

// 3. Upload Route
app.post('/upload-history', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    console.log(`Received file: ${req.file.filename}`);
    
    res.status(200).json({
        message: 'File uploaded successfully',
        filename: req.file.filename
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});