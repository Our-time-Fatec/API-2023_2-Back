import { Router, Request, Response } from "express";
import authenticateToken from "../middlewares/Auth";
import SolicitacaoController from "../controllers/SolicitacaoController";

const solicitacaoRoutes = Router()

solicitacaoRoutes.post('/', authenticateToken, SolicitacaoController.createSolicitacao);
// solicitacaoRoutes.post('/:id', authenticateToken, SolicitacaoController.solicitacaoAceita);
// solicitacaoRoutes.post('/:id', authenticateToken, SolicitacaoController.solicitacaoRecusada);
solicitacaoRoutes.get('/:id', authenticateToken, SolicitacaoController.minhaSolicitacao);
solicitacaoRoutes.get('/:id', authenticateToken, SolicitacaoController.solicitacaoRecebida);
// solicitacaoRoutes.put('/:id', authenticateToken, SolicitacaoController);
// solicitacaoRoutes.delete('/:id', authenticateToken, SolicitacaoController);

export default solicitacaoRoutes
