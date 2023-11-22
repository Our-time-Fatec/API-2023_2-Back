import { Request, Response } from 'express';
import Locacao from '../models/Locacao';
import User from '../models/User';
import Bicicleta from '../models/Bicicleta';

class LocacaoController {


  async createLocacaoFromSolicitacao(locatarioId: number, bicicletaId: number, bicicletaDonoId: number) {
    try {

      const locacao = await Locacao.create({
        locatarioId,
        bicicletaId,
        bicicletaDonoId,
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
}

export default new LocacaoController();
