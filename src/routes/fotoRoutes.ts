import { Router, Request, Response } from "express";
import fotoController from "../controllers/fotoController";
import authenticateToken from "../middlewares/Auth";
import upload from "../middlewares/Upload";

const fotosRoutes = Router();

fotosRoutes.post('/upload', authenticateToken, upload.single('file'), fotoController.createFoto);
fotosRoutes.get('/', authenticateToken, fotoController.listFotos);
fotosRoutes.get('/:id', authenticateToken, fotoController.getFotoById);
fotosRoutes.put('/:id', authenticateToken, fotoController.updateFoto);
fotosRoutes.delete('/:id', authenticateToken, fotoController.deleteFoto);

export default fotosRoutes;