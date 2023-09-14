import { Router, Request, Response } from "express";
import fotoController from "../controllers/fotoController";

const fotosRoutes = Router();

fotosRoutes.post('/', fotoController.createFoto);
fotosRoutes.get('/', fotoController.listFotos);
fotosRoutes.get('/:id', fotoController.getFotoById);
fotosRoutes.put('/:id', fotoController.updateFoto);
fotosRoutes.delete('/:id', fotoController.deleteFoto);

export default fotosRoutes;