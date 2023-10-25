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
        url: req.file?.filename,
        id_bike,
      });

      return res.status(201).json(foto);
    } catch (error) {
      console.error('Erro ao fazer upload da foto:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async deleteFoto(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const foto = await Foto.findByPk(id);

      if (!foto) {
        return res.status(404).json({ error: 'Foto não encontrada.' });
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
