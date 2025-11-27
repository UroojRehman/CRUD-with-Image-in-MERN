import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, path.join(__dirname,'../uploads' ))
    },
    filename: (req, file,cb)=>{
        const ext = path.extname(file.originalname);
        const filename = Date.now()+file.originalname;
        cb(null, filename);
        
    }
});

const fileFilter = (req, file, cb) =>{
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if(extname && mimetype){
        return cb(null, true);
    }else{
        return cb(new Error("only images are allowed (jpeg, jpg, png)"));
    }
};

const upload = multer({
    storage,
    limits: {fileSize: 1024 * 1024 * 2},
    fileFilter
});

export default upload;