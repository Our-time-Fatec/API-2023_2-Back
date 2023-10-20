import { Router, Request, Response } from "express";
import authenticateToken from "../middlewares/Auth";
import solicitacaoController from "../controllers/SolicitacaoController";

const solicitacaoRoutes = Router()

solicitacaoRoutes.get('/:idLocador', solicitacaoController.solicitacaoRecebida);
solicitacaoRoutes.get('/:idSolicitacao/:idLocador', solicitacaoController.solicitacaoFeita);
solicitacaoRoutes.post('/create', solicitacaoController.createSolicitacao);
solicitacaoRoutes.get('/', solicitacaoController.findAllSolicitacoes);
// solicitacaoRoutes.post('/:id', authenticateToken, solicitacaoController.solicitacaoRecusada);
// solicitacaoRoutes.get('/:id/:idLocador', authenticateToken, solicitacaoController.minhaSolicitacao);
// solicitacaoRoutes.put('/:id', authenticateToken, solicitacaoController);
// solicitacaoRoutes.delete('/:id', authenticateToken, solicitacaoController);

export default solicitacaoRoutes
