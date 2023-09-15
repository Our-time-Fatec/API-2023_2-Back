import { config } from 'dotenv';
import multer, { StorageEngine } from 'multer';
import path from 'path';
config()
const diretorio = process.env.FOLDERPHOTOS || '';
const storage = multer.diskStorage({
    destination: path.resolve(__dirname, diretorio),
    filename: (req, file, callback) => {
        const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        callback(null, filename);
    }
});

const upload = multer({ storage });

export default upload;
