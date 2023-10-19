import { Router, Request, Response } from "express";
import authenticateToken from "../middlewares/Auth";
import solicitacaoController from "../controllers/SolicitacaoController";

const solicitacaoRoutes = Router()

solicitacaoRoutes.get('/:idLocador', authenticateToken, solicitacaoController.solicitacaoRecebida);
solicitacaoRoutes.get('/:idDono', authenticateToken, solicitacaoController.solicitacaoFeita);
solicitacaoRoutes.post('/', authenticateToken, solicitacaoController.createSolicitacao);
// solicitacaoRoutes.post('/:id', authenticateToken, solicitacaoController.solicitacaoAceita);
// solicitacaoRoutes.post('/:id', authenticateToken, solicitacaoController.solicitacaoRecusada);
// solicitacaoRoutes.get('/:id/:idLocador', authenticateToken, solicitacaoController.minhaSolicitacao);
// solicitacaoRoutes.put('/:id', authenticateToken, solicitacaoController);
// solicitacaoRoutes.delete('/:id', authenticateToken, solicitacaoController);

export default solicitacaoRoutes
