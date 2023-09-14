import { Router, Request, Response } from "express";
import modalidadeController from "../controllers/modalidadeController";

const modalidadeRoutes = Router();

modalidadeRoutes.post('/', modalidadeController.createModalidade);
modalidadeRoutes.get('/', modalidadeController.listModalidades);
modalidadeRoutes.get('/:id', modalidadeController.getModalidadeById);
modalidadeRoutes.put('/:id', modalidadeController.updateModalidade);
modalidadeRoutes.delete('/:id', modalidadeController.deleteModalidade);

export default modalidadeRoutes;