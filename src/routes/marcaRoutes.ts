import { Router, Request, Response } from "express";
import marcaController from "../controllers/marcaController";
import authenticateToken from "../middlewares/Auth";

const marcaRoutes = Router();

marcaRoutes.post('/', authenticateToken, marcaController.createMarca);
marcaRoutes.get('/', authenticateToken, marcaController.listMarcas);
marcaRoutes.get('/:id', authenticateToken, marcaController.getMarcaById);
marcaRoutes.put('/:id', authenticateToken, marcaController.updateMarca);
marcaRoutes.delete('/:id', authenticateToken, marcaController.deleteMarca);

export default marcaRoutes;