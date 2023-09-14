import { Model, DataTypes, HasManyGetAssociationsMixin } from 'sequelize';
import sequelize from '../config/database';
import Marca from './Marca';
import Modalidade from './Modalidade';
import User from './User';
import Foto from './Foto';

enum Generos {
  Masculino = 'Masculino',
  Feminino = 'Feminino',
  Unissex = 'Unissex',
}

enum Marchas {
  M18 = '18',
  M21 = '21',
  M24 = '24',
  M27 = '27',
}

enum Aro {
  A20 = '20',
  A24 = '24',
  A26 = '26',
  A275 = '27.5',
  A29 = '29',
  A700 = '700',
}

class Bicicleta extends Model {
  public id!: number;
  public tamanho!: string;
  public cor!: string;
  public generos!: Generos;
  public marchas!: Marchas;
  public aro!: Aro;
  public material!: string;
  public suspensao!: string;
  public descricao!: string;
  public valorHora!: number;
  public valorDia!: number;
  public isAlugada!: boolean;
  public marcaId!: number;
  public modalidadeId!: number;
  public donoId!: number;
  public avaliacao!: number;
  public getFotos!: HasManyGetAssociationsMixin<Foto>;
}

Bicicleta.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tamanho: {
      type: DataTypes.STRING,
    },
    cor: {
      type: DataTypes.STRING,
    },
    generos: {
      type: DataTypes.ENUM(...Object.values(Generos)),
    },
    marchas: {
      type: DataTypes.ENUM(...Object.values(Marchas)),
    },
    aro: {
      type: DataTypes.ENUM(...Object.values(Aro)),
    },
    material: {
      type: DataTypes.STRING,
    },
    suspensao: {
      type: DataTypes.STRING,
    },
    descricao: {
      type: DataTypes.STRING,
    },
    valorHora: {
      type: DataTypes.DECIMAL(10, 2),
    },
    valorDia: {
      type: DataTypes.DECIMAL(10, 2),
    },
    isAlugada: {
      type: DataTypes.BOOLEAN,
    },
    marcaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Marcas',
        key: 'id',
      },
    },
    modalidadeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Modalidades',
        key: 'id',
      },
    },
    donoId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    avaliacao: {
      type: DataTypes.TINYINT,
    },
  },
  {
    sequelize,
    modelName: 'Bicicletas',
  }
);
Bicicleta.belongsTo(Marca, { foreignKey: 'marcaId', as: 'marca' });
Bicicleta.belongsTo(Modalidade, { foreignKey: 'modalidadeId', as: 'modalidade' });
Bicicleta.hasMany(Foto, { foreignKey: 'id_bike', as: 'fotos' });
Foto.hasMany(Bicicleta, { foreignKey: 'id_bike', as: 'bicicleta' });

export default Bicicleta;
