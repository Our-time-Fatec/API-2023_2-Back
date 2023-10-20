import { Router, Request, Response } from "express";
import authenticateToken from "../middlewares/Auth";
import solicitacaoController from "../controllers/SolicitacaoController";

const solicitacaoRoutes = Router()

solicitacaoRoutes.get('/:idLocador', authenticateToken, solicitacaoController.solicitacaoRecebida);
solicitacaoRoutes.get('/:idSolicitacao/:idLocador', authenticateToken,solicitacaoController.solicitacaoFeita);
solicitacaoRoutes.post('/create', authenticateToken,solicitacaoController.createSolicitacao);
solicitacaoRoutes.get('/', authenticateToken,solicitacaoController.findAllSolicitacoes);
solicitacaoRoutes.put('/:idLocador/aceitar', authenticateToken,solicitacaoController.acceptRequest);
solicitacaoRoutes.put('/:idLocador/recusar', authenticateToken,solicitacaoController.rejectRequest);

export default solicitacaoRoutes
