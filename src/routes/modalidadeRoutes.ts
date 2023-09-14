import { Router, Request, Response } from "express";
import modalidadeController from "../controllers/modalidadeController";
import authenticateToken from "../middlewares/Auth";

const modalidadeRoutes = Router();

modalidadeRoutes.post('/', authenticateToken, modalidadeController.createModalidade);
modalidadeRoutes.get('/', authenticateToken, modalidadeController.listModalidades);
modalidadeRoutes.get('/:id', authenticateToken, modalidadeController.getModalidadeById);
modalidadeRoutes.put('/:id', authenticateToken, modalidadeController.updateModalidade);
modalidadeRoutes.delete('/:id', authenticateToken, modalidadeController.deleteModalidade);

export default modalidadeRoutes;