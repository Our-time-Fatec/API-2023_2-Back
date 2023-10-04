import { DataTypes, HasManyGetAssociationsMixin, Model, Sequelize } from 'sequelize';
import sequelize from '../config/database';
import Bicicleta from './Bicicleta';

class Solicitacao extends Model{
    public id!: number;
    public idLocador!: number;
    public isRespondido!: boolean;
    public isAceito!: boolean;
    public bicicletaId!: number;
    public DataouHora!: Date;
}

Solicitacao.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idLocador: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        isRespondido: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isAceito: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        bicicletaId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Bicicletas',
                key: 'id',
            },
            allowNull: false,
        },
        DataouHora: {
            type: DataTypes.DATE,  
        },
    },
    {
        sequelize,
        modelName: 'Solicitacao',
    }
);
Solicitacao.belongsTo(Bicicleta, { foreignKey: 'bicicletaId', as: 'bicicleta' });

export default Solicitacao;