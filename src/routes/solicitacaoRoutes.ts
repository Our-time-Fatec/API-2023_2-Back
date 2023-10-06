import { Router, Request, Response } from "express";
import authenticateToken from "../middlewares/Auth";
import solicitacaoController from "../controllers/SolicitacaoController";

const solicitacaoRoutes = Router()

solicitacaoRoutes.put('/', authenticateToken, solicitacaoController.createSolicitacao);
// solicitacaoRoutes.post('/:id', authenticateToken, solicitacaoController.solicitacaoAceita);
// solicitacaoRoutes.post('/:id', authenticateToken, solicitacaoController.solicitacaoRecusada);
solicitacaoRoutes.get('/:id', authenticateToken, solicitacaoController.minhaSolicitacao);
solicitacaoRoutes.get('/:id', authenticateToken, solicitacaoController.solicitacaoRecebida);
// solicitacaoRoutes.put('/:id', authenticateToken, solicitacaoController);
// solicitacaoRoutes.delete('/:id', authenticateToken, solicitacaoController);

export default solicitacaoRoutes
