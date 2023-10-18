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

    async recebeSolicitacao(req: Request, res: Response){
        try{
            const {idLocador: donoId,} = req.params;
            const solicitacaoRecebida = await Solicitacao.findOne({
                where: {
                    donoId,
                }
            })
            
            if (!solicitacaoRecebida) {
                return res.status(404).json({error: 'Erro ao buscar solicitações recebidas'});
            }
            
            
            return res.status(200).json({solicitacaoRecebida});
        }catch (error){
            console.error('Você não tem solicitações pendentes.', error);
            return res.status(500).json({error: 'Erro interno do servidor ao enviar a solicitação'});
        }
    }

    async feitasSolicitacao(req: Request, res:Response){
        try{
            const {idLocador} = req.params;
            const solicitacaoFeita = await Solicitacao.findByPk(idLocador)
            if(!solicitacaoFeita) {
                return res.status(404).json({error: 'Erro durante a buscas de suas solicitações feitas'});
            }
                return res.status(200).json({solicitacaoFeita});
        }catch (error){
            console.error('Erro na busca', error);
            return res.status(500).json({error: 'Erro interno de servidor'});
        }
    }
}

export default new SolicitacaoController();

