import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import Bicicleta from '../models/Bicicleta';
import Marca from '../models/Marca';
import Modalidade from '../models/Modalidade';
import Foto from '../models/Foto';

function generateRandomPassword(length: number): string {
  if (length <= 0) {
    throw new Error('O comprimento da senha deve ser maior que zero.');
  }

  const buffer = crypto.randomBytes(length);

  const randomPassword = buffer.toString('hex');

  return randomPassword;
}

class UserController {

  async registerUser(req: Request, res: Response) {
    try {
      const { username, email, password, telefone, endereco } = req.body;

      if (!username || !email || !password || !telefone || !endereco) {
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
        password: hashedPassword,
        telefone,
        endereco
      });

      res.status(201).json({ message: 'Usuario cadastrado com sucesso.' });
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign({ userId: user.id }, 'chave_secreta', { expiresIn: '1h' });

    res.status(200).json({ message: 'Autenticação bem-sucedida', username: user.username, imageUser: user.imageUser, token });
  };

  async authUserGoogle(req: Request, res: Response) {
    const { sub, picture, name, email } = req.body;
    const user = await User.findOne({ where: { googleID: sub } });

    if (!user) {
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ error: 'Este email já está em uso.' });
      }

      const randomPassword = generateRandomPassword(10);
      const password = await bcrypt.hash(randomPassword, 10);
      const newUser = await User.create({
        googleID: sub,
        imageUser: picture,
        username: name,
        email,
        password: password
      });

      console.log(newUser)
      const token = jwt.sign({ userId: newUser.id }, 'chave_secreta', { expiresIn: '1h' });
      return res.status(200).json({ message: 'Autenticação bem-sucedida', username: newUser.username, imageUser: newUser.imageUser, token });
    }


    const token = jwt.sign({ userId: user.id }, 'chave_secreta', { expiresIn: '1h' });
    res.status(200).json({ message: 'Autenticação bem-sucedida', username: user.username, imageUser: user.imageUser, token });
  };

  async findAllUsers(req: Request, res: Response) {
    try {
      const users = await User.findAll({
        attributes: {
          exclude: ['password']
        }
      });

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
        attributes: {
          exclude: ['password'],
        },
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
        return res.status(404).json({ error: 'Usuário não encontrado.' });
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
      const { username, email, password, telefone, endereco } = req.body;
      const userId = req.body.userId;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      if (user.id !== userId) {
        return res.status(404).json({ error: 'Você não tem permissão para editar este usuário.' })
      }

      if (email) {
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser && existingUser.id !== user.id) {
          return res.status(400).json({ error: 'Este email já está em uso.' });
        }
        else {
          user.email = email
        }
      }

      if (username) {
        user.username = username;
      }
      if (telefone) {
        user.telefone = telefone;
      }
      if (endereco) {
        user.endereco = endereco;
      }

      await user.save();

      return res.status(200).json({ message: 'Usuario Editado com sucesso.' });
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
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      if (user.id !== userId) {
        return res.status(404).json({ error: 'Você não tem permissão para excluir este usuário.' })
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
