const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const port = 3000;

// Configure storage for multer (to store images in an "uploads" folder)
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

// Mock database to store prescription metadata
let prescriptions = [];

// Route to handle the prescription upload (POST request)
app.post('/upload-prescription', upload.single('prescriptionImage'), (req, res) => {
    const { doctor, date, description } = req.body;

    if (req.file && doctor && date && description) {
        // Store metadata (file info + user input)
        const newPrescription = {
            doctor,
            date,
            description,
            filePath: `/uploads/${req.file.filename}`, // The URL path to access the uploaded image
        };
        prescriptions.push(newPrescription);
        res.status(200).json({ message: 'Prescription uploaded successfully!', prescription: newPrescription });
    } else {
        res.status(400).json({ message: 'Please provide all required fields!' });
    }
});

// Route to fetch all prescriptions
app.get('/get-prescriptions', (req, res) => {
    res.status(200).json(prescriptions);
});

// Serve the frontend (HTML, CSS, and JS)
app.use(express.static('public'));  // Make sure the 'public' folder contains your frontend files

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
