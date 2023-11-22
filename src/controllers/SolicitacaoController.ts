import { Request, Response } from 'express';
import Solicitacao from '../models/Solicitacao';
import Bicicleta from '../models/Bicicleta';
import User from '../models/User';
import Marca from '../models/Marca';
import Modalidade from '../models/Modalidade';
import locacaoController from './locacao.Controller';

class SolicitacaoController {
    async createSolicitacao(req: Request, res: Response) {
        try {
            const userId = req.body.userId;
            const {
                idSolicitacao,
                idLocatario,
                idBicicleta,
                isRespondido,
                isAceito,
                DiaouHora

            } = req.body;

            const locatario = await User.findByPk(idLocatario);

            if (locatario?.isAlugando) {
                return res.status(400).json({ error: 'Você já esta alugando uma bicicleta.' })
            }

            const Solicitacoes = await Solicitacao.findAll({
                where: {
                    idLocatario,
                    idBicicleta,
                    isRespondido: false
                },
            });

            if (Solicitacoes.length > 0) {
                return res.status(400).json({ error: 'Você já tem uma solicitação em aberto para esta bicicleta.' })
            }

            const solicitacao = await Solicitacao.create({
                idSolicitacao,
                idLocatario,
                idBicicleta,
                isRespondido,
                isAceito,
                DiaouHora
            });
            if (!idLocatario) {
                return res.status(400).json({ error: 'O campo de id não é valido' })
            }
            return res.status(200).json({ message: "Solicitação enviada com sucesso", idRequest: solicitacao.idSolicitacao });
        } catch (error) {
            console.error('Erro ao enviar a solicitação', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async solicitacoesEnviadas(req: Request, res: Response) {
        try {
            const { idLocatario } = req.params;
            const Solicitacoes = await Solicitacao.findAll({
                where: {
                    idLocatario,
                },
                include: [
                    {
                        model: Bicicleta, as: 'bicicleta', include: [
                            { model: Marca, as: 'marca' },
                            { model: Modalidade, as: 'modalidade' },
                            {
                                model: User,
                                as: 'dono',
                                attributes: {
                                    exclude: ['password'],
                                },
                            },
                        ],
                    },
                    {
                        model: User, as: 'locatario',
                        attributes: {
                            exclude: ['password'],
                        },
                    }
                ],
            });
            if (!Solicitacoes) {
                return res.status(500).json({ error: 'Erro ao buscar a solicitacões enviadas.' })
            }

            return res.status(200).json(Solicitacoes);
        } catch (error) {
            console.error('Você não tem solicitações pendentes.', error);
            return res.status(500).json({ error: 'Erro interno do servidor ao enviar a solicitação' });
        }
    }

    async solicitacoesRecebidas(req: Request, res: Response) {
        try {
            const { idLocador } = req.params

            const bicicletasDoLocador = await Bicicleta.findAll({
                where: {
                    donoId: idLocador,
                },
                attributes: ['id'],
            });

            const idBicicletas = bicicletasDoLocador.map((bicicleta) => bicicleta.id);

            const solicitacaoRecebida = await Solicitacao.findAll({
                where: {
                    idBicicleta: idBicicletas,
                },
                include: [
                    {
                        model: Bicicleta, as: 'bicicleta', include: [
                            { model: Marca, as: 'marca' },
                            { model: Modalidade, as: 'modalidade' },
                            {
                                model: User,
                                as: 'dono',
                                attributes: {
                                    exclude: ['password'],
                                },
                            },
                        ],
                    },
                    {
                        model: User, as: 'locatario',
                        attributes: {
                            exclude: ['password'],
                        },
                    }
                ],
            });

            if (!solicitacaoRecebida) {
                return res.status(500).json({ error: 'Erro durante a busca das solicitações' })
            }
            return res.status(200).json(solicitacaoRecebida);
        } catch (error) {
            console.error('Você não tem solicitações pendentes.', error);
            return res.status(500).json({ error: 'Erro interno do servidor ao enviar a solicitação' });

        }
    }

    async findAllSolicitacoes(req: Request, res: Response) {
        try {
            const solicitacoes = await Solicitacao.findAll();

            return res.status(200).json(solicitacoes)
        } catch (error) {
            console.error('Você não tem solicitações pendentes.', error);
            return res.status(500).json({ error: 'Erro interno do servidor ao enviar a solicitação' });
        }
    }



    async acceptRequest(req: Request, res: Response) {
        try {
            const { idSolicitacao } = req.params;
            const userId = req.body.userId

            const accept = await Solicitacao.findByPk(idSolicitacao);
            if (!accept) {
                return res.status(404).json({ error: 'Solicitação não encontrada' });
            }

            const bicicleta = await Bicicleta.findByPk(accept.idBicicleta);
            if (!bicicleta || bicicleta.donoId !== userId) {
                return res.status(403).json({ error: 'Usuário não autorizado!' });
            }

            accept.isAceito = true;
            accept.isRespondido = true;

            await accept.save();
            const locacaoid = await locacaoController.createLocacaoFromSolicitacao(accept.idLocatario, bicicleta.id, bicicleta.donoId);
            return res.status(200).json({ message: `Solicitação aceita com sucesso! Locação Id ${locacaoid} gerada!` });
        } catch (error) {
            console.error('Erro ao aceitar a solicitação.', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async rejectRequest(req: Request, res: Response) {
        try {
            const { idSolicitacao } = req.params;
            const userId = req.body.userId

            const reject = await Solicitacao.findByPk(idSolicitacao);
            if (!reject) {
                return res.status(404).json({ error: "Solicitação não encontrada" });
            }

            const bicicleta = await Bicicleta.findByPk(reject.idBicicleta);
            if (!bicicleta || bicicleta.donoId !== userId) {
                return res.status(403).json({ error: 'Usuário não autorizado!' });
            }

            reject.isAceito = false;
            reject.isRespondido = true;

            await reject.save();

            return res.status(200).json({ message: "Solicitação recusada com sucesso!" });
        } catch (error) {
            console.error("Erro ao recusar a solicitação.", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }


}

export default new SolicitacaoController();

