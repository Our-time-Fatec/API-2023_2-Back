import { Request, Response } from 'express';
import Foto from '../models/Foto';
import Bicicleta from '../models/Bicicleta';

class FotoController {

  async createFoto(req: Request, res: Response) {
    try {
      const { id_bike } = req.body;

      const bicicleta = await Bicicleta.findByPk(id_bike);
      if (!bicicleta) {
        return res.status(404).json({ error: 'Bicicleta não encontrada' });
      }

      const foto = await Foto.create({
        url: req.file?.path,
        id_bike,
      });

      return res.status(201).json(foto);
    } catch (error) {
      console.error('Erro ao fazer upload da foto:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async listFotos(req: Request, res: Response) {
    try {
      const fotos = await Foto.findAll();

      return res.status(200).json(fotos);
    } catch (error) {
      console.error('Erro ao buscar fotos:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async getFotoById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const foto = await Foto.findByPk(id);

      if (!foto) {
        return res.status(404).json({ error: 'Foto não encontrada' });
      }

      return res.status(200).json(foto);
    } catch (error) {
      console.error('Erro ao buscar uma foto:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async updateFoto(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { url, id_bike } = req.body;

      const foto = await Foto.findByPk(id);

      if (!foto) {
        return res.status(404).json({ error: 'Foto não encontrada' });
      }

      foto.url = url;
      foto.id_bike = id_bike;

      await foto.save();

      return res.status(200).json(foto);
    } catch (error) {
      console.error('Erro ao atualizar uma foto:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async deleteFoto(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const foto = await Foto.findByPk(id);

      if (!foto) {
        return res.status(404).json({ error: 'Foto não encontrada' });
      }

      await foto.destroy();

      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir uma foto:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
}

export default new FotoController();
