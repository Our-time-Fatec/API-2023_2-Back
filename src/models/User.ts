import { DataTypes, HasManyGetAssociationsMixin, Model, Sequelize } from 'sequelize';
import sequelize from '../config/database';
import Bicicleta from './Bicicleta';

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
  public getBicicletas!: HasManyGetAssociationsMixin<Bicicleta>;
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.DOUBLE ,
    },
    latitude: {
      type: DataTypes.DOUBLE ,
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