import express from 'express';
import multer from 'multer';
import path from 'path';
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(
        file.originalname
      )}`.toLowerCase()
    ),
});

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedFiles = /jpg|jpeg|png/;
    const extname = allowedFiles.test(
      path.extname(file.originalname.toLowerCase())
    );
    const mimetype = allowedFiles.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      var err = Error('Images only');
      return cb(err);
    }
  },
});
