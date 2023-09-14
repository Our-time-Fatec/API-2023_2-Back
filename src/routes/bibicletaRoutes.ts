import { Router, Request, Response } from "express";
import bicicletaController from "../controllers/bicicletaController";

const bicicletaRoutes = Router();

bicicletaRoutes.post('/', bicicletaController.createBicicleta);
bicicletaRoutes.get('/', bicicletaController.listBicicletas);
bicicletaRoutes.get('/:id', bicicletaController.getBicicletaById);
bicicletaRoutes.put('/:id', bicicletaController.updateBicicleta);
bicicletaRoutes.delete('/:id', bicicletaController.deleteBicicleta);

export default bicicletaRoutes;