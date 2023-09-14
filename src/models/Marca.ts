import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Marca extends Model {
  public id!: number;
  public nome!: string;
}

Marca.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Marcas',
  }
);

export default Marca;
