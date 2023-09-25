import { Request, Response } from 'express';
import Bicicleta from '../models/Bicicleta';
import Marca from '../models/Marca';
import Modalidade from '../models/Modalidade';
import Foto from '../models/Foto';
import User from '../models/User';

class BicicletaController {

  async createBicicleta(req: Request, res: Response) {
    try {
      const userId = req.body.userId;
      const {
        tamanho,
        cor,
        generos,
        marchas,
        aro,
        material,
        suspensao,
        descricao,
        valorHora,
        valorDia,
        marcaId,
        modalidadeId
      } = req.body;

      if (!tamanho || !cor || !generos || !marchas || !aro || !material || !suspensao || !descricao || !valorHora || !valorDia || !marcaId || !modalidadeId) {
        return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
      }

      const bicicleta = await Bicicleta.create({
        tamanho,
        cor,
        generos,
        marchas,
        aro,
        material,
        suspensao,
        descricao,
        valorHora,
        valorDia,
        isAlugada: false,
        marcaId,
        modalidadeId,
        donoId: userId
      });

      return res.status(201).json({ message: "Bicicleta criada com sucesso", bikeId: bicicleta.id });
    } catch (error) {
      console.error('Erro ao criar uma bicicleta:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async listBicicletas(req: Request, res: Response) {
    try {
      const bicicletas = await Bicicleta.findAll(
        {
          include: [
            { model: Marca, as: 'marca' },
            { model: Modalidade, as: 'modalidade' },
            { model: Foto, as: 'fotos' },
            {
              model: User, as: 'dono',
              attributes: {
                exclude: ['password'],
              },
            }
          ],
        }
      );

      return res.status(200).json(bicicletas);
    } catch (error) {
      console.error('Erro ao buscar bicicletas:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async getBicicletaById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const bicicleta = await Bicicleta.findByPk(id, {
        include: [
          { model: Marca, as: 'marca' },
          { model: Modalidade, as: 'modalidade' },
          { model: Foto, as: 'fotos' },
          {
            model: User, as: 'dono',
            attributes: {
              exclude: ['password'],
            },
          }
        ],
      });


      if (!bicicleta) {
        return res.status(404).json({ error: 'Bicicleta não encontrada' });
      }

      return res.status(200).json(bicicleta);
    } catch (error) {
      console.error('Erro ao buscar uma bicicleta:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async updateBicicleta(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.body.userId;
      const {
        tamanho,
        cor,
        generos,
        marchas,
        aro,
        material,
        suspensao,
        descricao,
        valorHora,
        valorDia,
        isAlugada,
        marcaId,
        modalidadeId,
        avaliacao,
      } = req.body;

      const bicicleta = await Bicicleta.findByPk(id);

      if (!bicicleta) {
        return res.status(404).json({ error: 'Bicicleta não encontrada' });
      }

      if (bicicleta.donoId !== userId) {
        return res.status(403).json({ error: 'Você não tem permissão para editar esta bicicleta' });
      }

      bicicleta.tamanho = tamanho;
      bicicleta.cor = cor;
      bicicleta.generos = generos;
      bicicleta.marchas = marchas;
      bicicleta.aro = aro;
      bicicleta.material = material;
      bicicleta.suspensao = suspensao;
      bicicleta.descricao = descricao;
      bicicleta.valorHora = valorHora;
      bicicleta.valorDia = valorDia;
      bicicleta.isAlugada = isAlugada;
      bicicleta.marcaId = marcaId;
      bicicleta.modalidadeId = modalidadeId;
      bicicleta.avaliacao = avaliacao;

      await bicicleta.save();

      return res.status(200).json({ message: 'Bicicleta editada com sucesso.' });
    } catch (error) {
      console.error('Erro ao atualizar uma bicicleta:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async deleteBicicleta(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.body.userId;

      const bicicleta = await Bicicleta.findByPk(id);

      if (!bicicleta) {
        return res.status(404).json({ error: 'Bicicleta não encontrada' });
      }

      if (bicicleta.donoId !== userId) {
        return res.status(403).json({ error: 'Você não tem permissão para excluir esta bicicleta' });
      }

      await bicicleta.destroy();

      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir uma bicicleta:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
}

export default new BicicletaController();
