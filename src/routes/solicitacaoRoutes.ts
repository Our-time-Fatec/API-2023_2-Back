import { Router, Request, Response } from "express";
import authenticateToken from "../middlewares/Auth";
import solicitacaoController from "../controllers/SolicitacaoController";

const solicitacaoRoutes = Router()

solicitacaoRoutes.get('/Recebidas/:idLocador', authenticateToken, solicitacaoController.solicitacoesRecebidas);
solicitacaoRoutes.get('/Enviadas/:idLocatario', authenticateToken, solicitacaoController.solicitacoesEnviadas);
solicitacaoRoutes.get('/:idSolicitacao/:idLocador', authenticateToken, solicitacaoController.solicitacoesEnviadas);
solicitacaoRoutes.post('/create', authenticateToken, solicitacaoController.createSolicitacao);
solicitacaoRoutes.get('/', solicitacaoController.findAllSolicitacoes);
solicitacaoRoutes.put('/:idSolicitacao/aceitar', authenticateToken, solicitacaoController.acceptRequest);
solicitacaoRoutes.put('/:idSolicitacao/recusar', authenticateToken, solicitacaoController.rejectRequest);

export default solicitacaoRoutes
