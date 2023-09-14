import { Request, Response } from 'express';
import Marca from '../models/Marca';

class MarcaController {

  async createMarca(req: Request, res: Response) {
    try {
      const { nome } = req.body;

      if (!nome) {
        return res.status(400).json({ error: 'O campo nome é obrigatório.' });
      }

      const marca = await Marca.create({ nome });

      return res.status(201).json(marca);
    } catch (error) {
      console.error('Erro ao criar uma marca:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async listMarcas(req: Request, res: Response) {
    try {
      const marcas = await Marca.findAll();

      return res.status(200).json(marcas);
    } catch (error) {
      console.error('Erro ao buscar marcas:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async getMarcaById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const marca = await Marca.findByPk(id);

      if (!marca) {
        return res.status(404).json({ error: 'Marca não encontrada' });
      }

      return res.status(200).json(marca);
    } catch (error) {
      console.error('Erro ao buscar uma marca:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async updateMarca(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome } = req.body;

      const marca = await Marca.findByPk(id);

      if (!marca) {
        return res.status(404).json({ error: 'Marca não encontrada' });
      }

      marca.nome = nome;
      await marca.save();

      return res.status(200).json(marca);
    } catch (error) {
      console.error('Erro ao atualizar uma marca:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async deleteMarca(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const marca = await Marca.findByPk(id);

      if (!marca) {
        return res.status(404).json({ error: 'Marca não encontrada' });
      }

      await marca.destroy();

      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir uma marca:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
}

export default new MarcaController();
