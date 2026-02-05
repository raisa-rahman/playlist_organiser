const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const { chain } = require('stream-chain');
const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/StreamArray');

const app = express();
const PORT = 5000;

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- MULTER CONFIGURATION ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/';
        if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

// --- DAY 4: STREAMING PARSER FUNCTION ---
// This function handles the heavy lifting of reading the Spotify JSON
const parseSpotifyJSON = (filePath) => {
    console.log(`🚀 Starting high-performance parse: ${filePath}`);
    
    let totalMs = 0;
    let trackCount = 0;

    const pipeline = chain([
        fs.createReadStream(filePath),
        parser(),
        streamArray()
    ]);

    pipeline.on('data', (data) => {
        const stream = data.value;
        // Spotify documentation lists 'master_metadata_track_name' as the track name
        if (stream.master_metadata_track_name) {
            trackCount++;
            totalMs += stream.ms_played || 0; // ms_played is the duration in milliseconds
        }
    });

    pipeline.on('end', () => {
        const totalMinutes = Math.floor(totalMs / 1000 / 60);
        console.log(`✅ Parse Complete! Found ${trackCount} tracks. Total time: ${totalMinutes} min.`);
    });
};

// --- ROUTES ---

// Status Route
app.get('/', (req, res) => {
    res.send('Spotify Stats Backend is Running!');
});

// Day 4 Upload Route (PLACE THE CODE HERE)
app.post('/upload-history', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded.');

    // This triggers the background processing
    parseSpotifyJSON(req.file.path);

    res.status(200).json({
        message: 'File received! Analyzing your lifetime history in the background...',
        filename: req.file.filename
    });
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});