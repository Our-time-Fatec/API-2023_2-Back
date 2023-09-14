import { Router, Request, Response } from "express";
import locacaoController from "../controllers/locacao.Controller";

const locacaoRoutes = Router();

locacaoRoutes.post('/', locacaoController.createLocacao);
locacaoRoutes.get('/', locacaoController.listLocacoes);
locacaoRoutes.get('/:id', locacaoController.getLocacaoById);
locacaoRoutes.put('/:id', locacaoController.updateLocacao);
locacaoRoutes.delete('/:id', locacaoController.deleteLocacao);

export default locacaoRoutes;