import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Bicicleta from './Bicicleta';
import User from './User';
import DouH from '../enums/DiaouHora';

class Locacao extends Model {
  public id!: number;
  public avaliacaoDono!: number | null;
  public avaliacaoLocatario!: number | null;
  public locatarioId!: number;
  public bicicletaId!: number;
  public bicicletaDonoId!: number;
  public isAtivo!: boolean;
  public isBikeDevolvida!: boolean;
  public DiaouHora!: DouH;
  public valorTotal!: number;
  public createdAt!: Date;
  public bicicleta!: Bicicleta;

}

Locacao.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    avaliacaoDono: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: true,
      validate: {
        max: 5,
      },
    },
    avaliacaoLocatario: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: true,
      validate: {
        max: 5,
      },
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
    isBikeDevolvida: {
      type: DataTypes.BOOLEAN,
      defaultValue: null,
    },
    isPago: {
      type: DataTypes.BOOLEAN,
      defaultValue: null,
    },
    DiaouHora: {
      type: DataTypes.ENUM(...Object.values(DouH)),
    },
    valorTotal: {
      type: DataTypes.DECIMAL(10, 2)
    }

  },
  {
    sequelize,
    modelName: 'Locacao',
  }
);
Locacao.belongsTo(Bicicleta, { foreignKey: 'bicicletaId', as: 'bicicleta' });
Locacao.belongsTo(User, { foreignKey: 'locatarioId', as: 'locatario' });

export default Locacao;
