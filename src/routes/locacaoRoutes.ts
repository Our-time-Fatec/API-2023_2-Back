import { Router, Request, Response } from "express";
import locacaoController from "../controllers/locacao.Controller";
import authenticateToken from "../middlewares/Auth";

const locacaoRoutes = Router();

locacaoRoutes.post('/', authenticateToken, locacaoController.createLocacao);
locacaoRoutes.get('/', authenticateToken, locacaoController.listLocacoes);
locacaoRoutes.get('/:id', authenticateToken, locacaoController.getLocacaoById);
locacaoRoutes.put('/:id', authenticateToken, locacaoController.updateLocacao);
locacaoRoutes.delete('/:id', authenticateToken, locacaoController.deleteLocacao);

export default locacaoRoutes;