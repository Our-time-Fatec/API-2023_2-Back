import { Request, Response } from 'express';
import Locacao from '../models/Locacao';
import User from '../models/User';
import Bicicleta from '../models/Bicicleta';
import { where } from 'sequelize';
import Marca from '../models/Marca';
import Modalidade from '../models/Modalidade';
import DouH from '../enums/DiaouHora';
import avaliacaoController from './avaliacaoController';

function calcularDiferencaEmDias(dataInicio: Date, dataFim: Date): number {
  const umDiaEmMilissegundos = 24 * 60 * 60 * 1000;
  const diferencaEmMilissegundos = Math.abs(dataFim.getTime() - dataInicio.getTime());
  const diferencaEmDias = Math.ceil(diferencaEmMilissegundos / umDiaEmMilissegundos);
  return diferencaEmDias;
}

function calcularDiferencaEmHoras(dataInicio: Date, dataFim: Date): number {
  const umHoraEmMilissegundos = 60 * 60 * 1000;
  const diferencaEmMilissegundos = Math.abs(dataFim.getTime() - dataInicio.getTime());
  const diferencaEmHoras = diferencaEmMilissegundos / umHoraEmMilissegundos;
  return Math.ceil(diferencaEmHoras);
}

class LocacaoController {

  async createLocacaoFromSolicitacao(locatarioId: number, bicicletaId: number, bicicletaDonoId: number, DiaouHora: DouH) {
    try {

      const locacao = await Locacao.create({
        locatarioId,
        bicicletaId,
        bicicletaDonoId,
        DiaouHora
      });

      const locatario = await User.findByPk(locatarioId);
      const bicicleta = await Bicicleta.findByPk(bicicletaId);

      if (locatario) {
        const updateLocatario = {
          isAlugando: true
        }
        locatario.update(updateLocatario);
      }

      if (bicicleta) {
        const updateBicicleta = {
          isAlugada: true
        }
        bicicleta.update(updateBicicleta);
      }

      return locacao.id
    } catch (error) {
      console.error('Erro ao criar uma locação:', error);
      return "Erro ao criar locação"
    }
  }

  async createLocacao(req: Request, res: Response) {
    try {
      const { avaliacaoDono, avaliacaoLocatario, locatarioId, bicicletaId, bicicletaDonoId, isAtivo } = req.body;

      const locacao = await Locacao.create({
        avaliacaoDono,
        avaliacaoLocatario,
        locatarioId,
        bicicletaId,
        bicicletaDonoId,
        isAtivo,
      });

      return res.status(201).json(locacao);
    } catch (error) {
      console.error('Erro ao criar uma locação:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async listLocacoes(req: Request, res: Response) {
    try {
      const locacoes = await Locacao.findAll();

      return res.status(200).json(locacoes);
    } catch (error) {
      console.error('Erro ao buscar locações:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async getLocacaoById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const locacao = await Locacao.findByPk(id);

      if (!locacao) {
        return res.status(404).json({ error: 'Locação não encontrada' });
      }

      return res.status(200).json(locacao);
    } catch (error) {
      console.error('Erro ao buscar uma locação:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async updateLocacao(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { avaliacaoDono, avaliacaoLocatario, locatarioId, bicicletaId, bicicletaDonoId, isAtivo } = req.body;

      const locacao = await Locacao.findByPk(id);

      if (!locacao) {
        return res.status(404).json({ error: 'Locação não encontrada' });
      }

      locacao.avaliacaoDono = avaliacaoDono;
      locacao.avaliacaoLocatario = avaliacaoLocatario;
      locacao.locatarioId = locatarioId;
      locacao.bicicletaId = bicicletaId;
      locacao.bicicletaDonoId = bicicletaDonoId;
      locacao.isAtivo = isAtivo;

      await locacao.save();

      return res.status(200).json(locacao);
    } catch (error) {
      console.error('Erro ao atualizar uma locação:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async deleteLocacao(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const locacao = await Locacao.findByPk(id);

      if (!locacao) {
        return res.status(404).json({ error: 'Locação não encontrada' });
      }

      await locacao.destroy();

      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir uma locação:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async LocacoesAlugadasById(req: Request, res: Response) {
    try {
      const { idLocatario } = req.params;

      const locacoes = await Locacao.findAll({
        where: {
          locatarioId: idLocatario,
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
        ]
      });

      if (!locacoes) {
        return res.status(404).json({ error: 'Locações não encontradas' });
      }

      return res.status(200).json(locacoes);
    } catch (error) {
      console.error('Erro ao buscar uma locação:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async LocacoesLocadasById(req: Request, res: Response) {
    try {
      const { idLocador } = req.params

      const bicicletasDoLocador = await Bicicleta.findAll({
        where: {
          donoId: idLocador,
        },
        attributes: ['id'],
      });

      const idBicicletas = bicicletasDoLocador.map((bicicleta) => bicicleta.id);

      const LocacoesLocadas = await Locacao.findAll({
        where: {
          bicicletaId: idBicicletas,
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

      if (!LocacoesLocadas) {
        return res.status(500).json({ error: 'Locações não encontradas' })
      }
      return res.status(200).json(LocacoesLocadas);
    } catch (error) {
      console.error('Erro ao buscar uma locação:', error);
      return res.status(500).json({ error: 'Erro interno do servidor ao enviar a solicitação' });

    }
  }

  async encerrarLocacao(req: Request, res: Response) {
    try {
      const { idLocacao } = req.params;
      const { avaliacaoDono } = req.body;
      const userId = req.body.userId

      const locacao = await Locacao.findByPk(idLocacao, {
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
      ],
      });

      if (!locacao) {
        return res.status(404).json({ error: 'Locação não encontrada' });
      }

      const bicicleta = await Bicicleta.findByPk(locacao.bicicletaId);

      if (!bicicleta) {
        return res.status(403).json({ error: 'Bicicleta nao existe!' });
      }

      if (locacao.locatarioId !== userId) {
        return res.status(403).json({ error: 'Usuário não autorizado!' });
      }

      locacao.isBikeDevolvida = true;
      locacao.avaliacaoDono = avaliacaoDono;
      bicicleta.isAlugada = false;

      const dataAtual = new Date();

      if (locacao.DiaouHora == DouH.Dia) {
        const diferencaEmDias = calcularDiferencaEmDias(locacao.createdAt, dataAtual);
        locacao.valorTotal = bicicleta.valorDia * diferencaEmDias;
      }
      else if (locacao.DiaouHora == DouH.Hora) {
        const diferencaEmHoras = calcularDiferencaEmHoras(locacao.createdAt, dataAtual);
        locacao.valorTotal = bicicleta.valorHora * diferencaEmHoras;
      }

      // await locacao.save();
      // await bicicleta.save();

      const teste = await avaliacaoController.updateAvaliacoes(locacao.bicicleta.donoId, locacao.bicicletaId)

      return res.status(200).json(teste);

    } catch (error) {
      console.error('Erro ao encerrar locação!.', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async confirmarPagamento(req: Request, res: Response) {
    try {
      const { idLocacao } = req.params;
      const userId = req.body.userId

      const locacao = await Locacao.findByPk(idLocacao, {
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
      ],
      });

      if (!locacao) {
        return res.status(404).json({ error: 'Locação não encontrada' });
      }


      if (locacao.bicicleta.donoId !== userId) {
        return res.status(403).json({ error: 'Usuário não autorizado!' });
      }

      const locatario = await User.findByPk(locacao.locatarioId);

      if (!locatario) {
          return res.status(400).json({ error: 'Locatário não existe' })
      }

      locacao.isAtivo = false;
      locatario.isAlugando = false;

      await locacao.save();
      await locatario.save();

      return res.status(200).json({ message: "Locação foi encerrada com sucesso!" });

    } catch (error) {
      console.error('Erro ao confirmar pagamento de locação.', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

}

export default new LocacaoController();
