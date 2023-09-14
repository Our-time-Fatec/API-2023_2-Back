import { Router, Request, Response } from "express";
import bicicletaController from "../controllers/bicicletaController";
import authenticateToken from "../middlewares/Auth";

const bicicletaRoutes = Router();

bicicletaRoutes.post('/', authenticateToken, bicicletaController.createBicicleta);
bicicletaRoutes.get('/', bicicletaController.listBicicletas);
bicicletaRoutes.get('/:id', bicicletaController.getBicicletaById);
bicicletaRoutes.put('/:id', authenticateToken, bicicletaController.updateBicicleta);
bicicletaRoutes.delete('/:id', authenticateToken, bicicletaController.deleteBicicleta);

export default bicicletaRoutes;