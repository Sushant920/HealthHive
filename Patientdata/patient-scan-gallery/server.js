const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const port = 3000;

// Configure storage for multer (to store images in a "uploads" folder)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp to avoid name collisions
    }
});

// Initialize multer
const upload = multer({ storage: storage });

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Serve static files from the "uploads" directory (for images)
app.use('/uploads', express.static('uploads'));

// Mock database to store scan metadata
let scans = [];

// Route to handle the scan upload (POST request)
app.post('/upload-scan', upload.single('scanImage'), (req, res) => {
    const { date, description } = req.body;

    if (req.file && date && description) {
        // Store metadata (file info + user input)
        const newScan = {
            date,
            description,
            filePath: `/uploads/${req.file.filename}`, // The URL path to access the uploaded image
        };
        scans.push(newScan);
        res.status(200).json({ message: 'Scan uploaded successfully!', scan: newScan });
    } else {
        res.status(400).json({ message: 'Please provide all required fields!' });
    }
});

// Route to fetch all scans
app.get('/get-scans', (req, res) => {
    res.status(200).json(scans);
});

// Serve the frontend (HTML, CSS, and JS)
app.use(express.static('public'));  // Make sure the 'public' folder contains your frontend files

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
