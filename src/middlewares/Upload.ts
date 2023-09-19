import { Request } from 'express';
import multer from 'multer';
import path from 'path';

const diretorio = process.env.FOLDERPHOTOS || '';

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, diretorio),
  filename: (req, file, callback) => {
    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    callback(null, filename);
  },
});

const imageFilter = (req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    const erro = new Error('Apenas arquivos de imagem são permitidos!') as any;
    erro.code = 'ERROR_UPLOAD_TYPE';
    callback(erro);
  } else {
    callback(null, true);
  }
};

const upload = multer({ storage, fileFilter: imageFilter });

export default upload;
