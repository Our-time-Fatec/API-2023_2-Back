import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {
  public id!: number;
  public email!: string;
  public username!: string;
  public password!: string;
  public telefone!: string;
  public endereco!: string;
  public longitude!: number;
  public latitude!: number;
  public isAlugando!: boolean;
  public avaliacaoBikes!: number;
  public avaliacaoLocacoes!: number;
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING,
    },
    endereco: {
      type: DataTypes.STRING,
    },
    longitude: {
      type: DataTypes.DECIMAL(9, 6),
    },
    latitude: {
      type: DataTypes.DECIMAL(9, 6),
    },
    isAlugando: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    avaliacaoBikes: {
      type: DataTypes.TINYINT,
    },
    avaliacaoLocacoes: {
      type: DataTypes.TINYINT,
    },
  },
  {
    sequelize,
    modelName: 'Users',
  }
);

export default User;