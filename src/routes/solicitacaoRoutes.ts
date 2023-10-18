import { Router, Request, Response } from "express";
import authenticateToken from "../middlewares/Auth";
import solicitacaoController from "../controllers/SolicitacaoController";

const solicitacaoRoutes = Router()

solicitacaoRoutes.post('/', authenticateToken, solicitacaoController.createSolicitacao);
solicitacaoRoutes.get('/:id', authenticateToken, solicitacaoController.recebeSolicitacao);
solicitacaoRoutes.get('/:id', authenticateToken, solicitacaoController.feitasSolicitacao);


export default solicitacaoRoutes
