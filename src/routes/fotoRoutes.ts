import { Router, Request, Response, NextFunction } from "express";
import fotoController from "../controllers/fotoController";
import authenticateToken from "../middlewares/Auth";
import { upload, uploadToS3 } from "../middlewares/Upload";

const fotosRoutes = Router();

fotosRoutes.post('/upload', authenticateToken, upload.single('file'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Erro ao fazer upload do arquivo.' });
    }
    const fileUrl = await uploadToS3(req.file);
    await fotoController.createFoto(req, res, fileUrl);
  } catch (error) {
    console.error('Erro ao fazer upload da foto:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

fotosRoutes.delete('/:id', authenticateToken, fotoController.deleteFoto);

export default fotosRoutes;