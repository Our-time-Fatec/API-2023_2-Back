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
            idBicicleta

        } = req.body;
        const solicitacao = await Solicitacao.create({
            idLocador,
            idBicicleta,
            DataouHora,
        });
        if(!idLocador){
            return res.status(400).json({error: 'O campo de id não é valido'})
        }
        return res.status(200).json({message:"Solicitação enviada com sucesso"});
        }catch (error){
            console.error('Erro ao enviar a solicitação', error);
            return res.status(500).json({error: 'Erro interno do servidor'});
        }
    }

    async solicitacaoFeita(req: Request, res: Response){
        try{
            const { idSolicitacao, idLocador } = req.params;
            const solicitacaoFeita = await Solicitacao.findOne({
              where: {
                idSolicitacao,
                idLocador,
              },
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
        try{
            const {idLocador} = req.params
            const solicitacaoRecebida = await Solicitacao.findAll({
                where: {
                    idLocador,
                }
            });
            
            if(!solicitacaoRecebida){
                return res.status(500).json({error: 'Erro durante a busca das solicitações'})
            }
            return res.status(200).json({solicitacaoRecebida});
        }catch (error){
            console.error('Você não tem solicitações pendentes.', error);
            return res.status(500).json({error: 'Erro interno do servidor ao enviar a solicitação'});

    }
    }

    async findAllSolicitacoes(req: Request, res: Response){
        try{
            const solicitacoes = await Solicitacao.findAll();
            
            return res.status(200).json({solicitacoes})
        }catch (error){
            console.error('Você não tem solicitações pendentes.', error);
            return res.status(500).json({error: 'Erro interno do servidor ao enviar a solicitação'});
        }
    }

}

export default new SolicitacaoController();

