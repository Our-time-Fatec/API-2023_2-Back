import { Router, Request, Response } from "express";
import marcaController from "../controllers/marcaController";

const marcaRoutes = Router();

marcaRoutes.post('/', marcaController.createMarca);
marcaRoutes.get('/', marcaController.listMarcas);
marcaRoutes.get('/:id', marcaController.getMarcaById);
marcaRoutes.put('/:id', marcaController.updateMarca);
marcaRoutes.delete('/:id', marcaController.deleteMarca);

export default marcaRoutes;