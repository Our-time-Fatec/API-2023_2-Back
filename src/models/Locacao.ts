import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Bicicleta from './Bicicleta';
import User from './User';

class Locacao extends Model {
  public id!: number;
  public avaliacaoDono!: number | null;
  public avaliacaoLocatario!: number | null;
  public locatarioId!: number;
  public bicicletaId!: number;
  public bicicletaDonoId!: number;
  public isAtivo!: boolean;
}

Locacao.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    avaliacaoDono: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    avaliacaoLocatario: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    locatarioId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', 
        key: 'id', 
      },
      allowNull: false,
    },
    bicicletaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Bicicletas', 
        key: 'id',
      },
      allowNull: false,
    },
    isAtivo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'Locacao',
  }
);
Locacao.belongsTo(Bicicleta, { foreignKey: 'bicicletaId', as: 'bicicleta' });
Locacao.belongsTo(User, { foreignKey: 'locatarioId', as: 'locatario' });

export default Locacao;
