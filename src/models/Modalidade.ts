import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Modalidade extends Model {
  public id!: number;
  public nome!: string;
}

Modalidade.init(
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
    tableName: 'Modalidades',
  }
);

export default Modalidade;
