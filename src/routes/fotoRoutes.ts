import { Router, Request, Response, NextFunction } from "express";
import fotoController from "../controllers/fotoController";
import authenticateToken from "../middlewares/Auth";
import upload from "../middlewares/Upload";
import multer from "multer";

const fotosRoutes = Router();

fotosRoutes.post('/upload', authenticateToken, (req: Request, res: Response, next: NextFunction) => {
    upload.single('file')(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: 'Erro ao fazer upload do arquivo.' });
        }

        if (err && err.code === 'ERROR_UPLOAD_TYPE') {
            return res.status(400).json({ error: 'Apenas arquivos de imagem são permitidos.' });
        }

        if (err) {
            console.error('Erro ao fazer upload da foto:', err);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
        next();
    });
}, fotoController.createFoto);

fotosRoutes.delete('/:id', authenticateToken, fotoController.deleteFoto);

export default fotosRoutes;