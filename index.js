const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Set up storage engine
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

// Ensure uploads directory exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully.');
});

// Download endpoint
app.get('/download/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    res.download(filePath);
});







// Add this to your existing Express server code

// Endpoint to list files in the uploads directory
app.get('/files', (req, res) => {
    const directoryPath = path.join(__dirname, 'uploads');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory');
        }
        res.json(files);
    });
});



//####################################################################
// Endpoint to get local IP address
const  getLocalIP = require('./getLocalIp');

app.get('/local-ip', (req, res) => {
    const localIP = getLocalIP();
    //res.json({ Ip: localIP, port: PORT });
    res.json({ localIP });
});
//####################################################################



app.get('/', function (req, res) {
    res.json({ message: "Hello chai aur code" })
})

app.get('/express', (req, res) => {
    res.send('Hello World!')
})

// Start server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


// this will listen on all network interfaces
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}...`);
});
