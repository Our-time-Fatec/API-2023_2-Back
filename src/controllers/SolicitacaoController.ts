import { Request, Response} from 'express';
import Solicitacao from '../models/Solicitacao';
import Bicicleta from '../models/Bicicleta';
import User from '../models/User';

class SolicitacaoController {
    async createSolicitacao(req: Request, res: Response){
        try{
        const {
            DataouHora,
            idLocador,

        } = req.body;
        const solicitacao = await Solicitacao.create({
            idLocador,
            DataouHora,
        });
        return res.status(200).json({message:"Solicitação enviada com sucesso"});
        }catch (error){
            console.error('Erro ao enviar a solicitação', error);
            return res.status(500).json({error: 'Erro interno do servidor'});
        }
    }

    async solicitacaoFeita(req: Request, res: Response){
        try{
            const {donoId: idLocador} = req.body
            const solicitacaoFeita = await Solicitacao.findOne({
                where:{
                    idLocador,
                }
            });

            if(!solicitacaoFeita){
                return res.status(500).json({error: 'Erro ao buscar a solicitacao enviada'})
            }
        
            return res.status(200).json({solicitacaoFeita});
        }catch (error){
            console.error('Você não tem solicitações pendentes.', error);
            return res.status(500).json({error: 'Erro interno do servidor ao enviar a solicitação'});
        }
    }

    async solicitacaoRecebida(req: Request, res: Response){

    }
}

export default new SolicitacaoController();

// feitas = locadorId
// recebidas = donoId