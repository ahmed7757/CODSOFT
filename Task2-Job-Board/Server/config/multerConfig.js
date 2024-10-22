import multer from 'multer';
import path from 'path';

// Set up Multer storage for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // Where to store files
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));  // Rename the file
    }
});

// File filter to only accept PDFs
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only PDFs are allowed!'), false);
    }
};

// Configure Multer
const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 },  // Limit file size to 5MB
    fileFilter
});

export default upload;
