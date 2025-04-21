import express from 'express';
import { listCare ,addCare,removeCare} from '../controllers/careController.js';
import multer from 'multer';
const CareRouter = express.Router();

//Image Storage Engine (Saving Image to uploads folder & rename it)

const storage = multer.diskStorage({
    destination: 'uploads2',
    filename: (req, file, cb) => {
        return cb(null,`${Date.now()}${file.originalname}`);
    }
})

const upload = multer({ storage: storage})

CareRouter.get("/listcare",listCare);
CareRouter.post("/addcare",upload.single('image'),addCare);
CareRouter.post("/removecare",removeCare);

export default CareRouter;