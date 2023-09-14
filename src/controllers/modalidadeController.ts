import { Request, Response } from 'express';
import Modalidade from '../models/Modalidade';

class ModalidadeController {

  async createModalidade(req: Request, res: Response) {
    try {
      const { nome } = req.body;

      if (!nome) {
        return res.status(400).json({ error: 'O campo nome é obrigatório.' });
      }

      const modalidade = await Modalidade.create({ nome });

      return res.status(201).json(modalidade);
    } catch (error) {
      console.error('Erro ao criar uma modalidade:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async listModalidades(req: Request, res: Response) {
    try {
      const modalidades = await Modalidade.findAll();

      return res.status(200).json(modalidades);
    } catch (error) {
      console.error('Erro ao buscar modalidades:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async getModalidadeById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const modalidade = await Modalidade.findByPk(id);

      if (!modalidade) {
        return res.status(404).json({ error: 'Modalidade não encontrada' });
      }

      return res.status(200).json(modalidade);
    } catch (error) {
      console.error('Erro ao buscar uma modalidade:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async updateModalidade(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome } = req.body;

      const modalidade = await Modalidade.findByPk(id);

      if (!modalidade) {
        return res.status(404).json({ error: 'Modalidade não encontrada' });
      }

      modalidade.nome = nome;
      await modalidade.save();

      return res.status(200).json(modalidade);
    } catch (error) {
      console.error('Erro ao atualizar uma modalidade:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async deleteModalidade(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const modalidade = await Modalidade.findByPk(id);

      if (!modalidade) {
        return res.status(404).json({ error: 'Modalidade não encontrada' });
      }

      await modalidade.destroy();

      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir uma modalidade:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
}

export default new ModalidadeController();
