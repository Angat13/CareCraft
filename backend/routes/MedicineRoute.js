import express from 'express';
import multer from 'multer';
import { listmed, addmed, removemed } from '../controllers/medController.js';

const MedicineRouter = express.Router();

// Image Storage Engine (Saving Image to uploads folder & renaming it)
const storage = multer.diskStorage({
    destination: 'uploads1', // Folder to store uploaded files
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

// Apply routes
MedicineRouter.get("/listmed", listmed);
MedicineRouter.post("/addmed", upload.single('image'), addmed); // Add multer middleware here
MedicineRouter.post("/removemed", removemed);

export default MedicineRouter;
