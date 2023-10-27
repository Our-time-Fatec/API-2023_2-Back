import { DataTypes, HasManyGetAssociationsMixin, Model, Sequelize } from 'sequelize';
import sequelize from '../config/database';
import Bicicleta from './Bicicleta';

class User extends Model {
  public id!: number;
  public googleID!: string;
  public imageUser!: string;
  public email!: string;
  public username!: string;
  public password!: string;
  public telefone!: string;
  public cep!: string;
  public estado!: string;
  public cidade!: string;
  public bairro!: string;
  public logradouro!: string;
  public numero_casa!: number;
  public longitude!: number;
  public latitude!: number;
  public isAlugando!: boolean;
  public avaliacaoBikes!: number;
  public avaliacaoLocacoes!: number;
  public getBicicletas!: HasManyGetAssociationsMixin<Bicicleta>;
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    googleID: {
      type: DataTypes.STRING,
      unique: true,
    },
    imageUser: {
      type: DataTypes.STRING,
      allowNull: true,
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
    cep: {
      type: DataTypes.STRING
    },
    estado: {
      type: DataTypes.STRING
    },
    cidade: {
      type: DataTypes.STRING
    },
    bairro: {
      type: DataTypes.STRING
    },
    logradouro: {
      type: DataTypes.STRING,
    },
    numero_casa: {
      type: DataTypes.NUMBER
    },
    longitude: {
      type: DataTypes.DOUBLE,
    },
    latitude: {
      type: DataTypes.DOUBLE,
    },
    isAlugando: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    avaliacaoBikes: {
      type: DataTypes.SMALLINT,
    },
    avaliacaoLocacoes: {
      type: DataTypes.SMALLINT,
    },
  },
  {
    sequelize,
    modelName: 'Users',
  }
);

User.hasMany(Bicicleta, { foreignKey: 'donoId', as: 'bicicletas' });
Bicicleta.belongsTo(User, { foreignKey: 'donoId', as: 'dono' })

export default User;