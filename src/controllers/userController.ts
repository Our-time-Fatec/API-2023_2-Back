import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import Bicicleta from '../models/Bicicleta';
import Marca from '../models/Marca';
import Modalidade from '../models/Modalidade';
import Foto from '../models/Foto';

class UserController {

  async registerUser(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
      }

      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ error: 'Este email já está em uso.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async loginUser(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign({ userId: user.id }, 'chave_secreta', { expiresIn: '1h' });

    res.status(200).json({ message: 'Autenticação bem-sucedida', token });
  };

  async findAllUsers(req: Request, res: Response) {
    try {
      const users = await User.findAll();

      return res.status(200).json(users);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async findUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id, {
        include: [
          { 
            model: Bicicleta, 
            as: 'bicicletas',
            include: [
              { model: Marca, as: 'marca' },
              { model: Modalidade, as: 'modalidade' },
              { model: Foto, as: 'fotos' },
            ],
           }
        ]
      });

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { username, email, password } = req.body;
      const userId = req.body.userId;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      if(user.id !== userId){
        return res.status(404).json({error: 'Você não tem permissão para editar este usuário'})
      }

      if (email) {
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser && existingUser.id !== user.id) {
          return res.status(400).json({ error: 'Este email já está em uso.' });
        }
      }

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }

      if (username) {
        user.username = username;
      }

      await user.save();

      return res.status(200).json(user);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.body.userId;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      if(user.id !== userId){
        return res.status(404).json({error: 'Você não tem permissão para excluir este usuário'})
      }

      await user.destroy();

      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
}

export default new UserController();
