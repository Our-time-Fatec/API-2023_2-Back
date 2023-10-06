import { Request, Response} from 'express';
import Solicitacao from '../models/Solicitacao';
import Bicicleta from '../models/Bicicleta';

class SolicitacaoController {
    async createSolicitacao(req: Request, res: Response){
        try{
        const idLocador = req.body.idLocador;
        const {
            DataouHora
        } = req.body;
        const solicitacao = await Solicitacao.create({
            idLocador,
            DataouHora,
            isAlugada: false
        });
        return res.status(200).json({message:"Solicitação enviada com sucesso"});
        }catch (error){
            console.error('Erro ao enviar a solicitação', error);
            return res.status(500).json({error: 'Erro interno do servidor ao enviar a solicitação'});
        }
    }

    async minhaSolicitacao(req: Request, res: Response){
        try{
            const isRespondido = req.body
            const{
                idLocador
            } = req.body;
            const solicitacoes = await Solicitacao.findByPk(idLocador, {
                include: [
                    { model: Solicitacao, as: 'solicitacao'}
                ]
            })
        }
    }

    async solicitacaoRecebida(req: Request, res: Response){

    }
}

export default new SolicitacaoController();

