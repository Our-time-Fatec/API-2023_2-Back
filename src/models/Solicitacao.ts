import { DataTypes, HasManyGetAssociationsMixin, Model, Sequelize } from 'sequelize';
import sequelize from '../config/database';
import Bicicleta from './Bicicleta';
import User from './User';
import DouH from '../enums/Data_ou_Hora';
import { AllowNull } from 'sequelize-typescript';

class Solicitacao extends Model{
    public idSolicitacao!: number;
    public idLocador!: number;
    public isRespondido!: boolean;
    public isAceito!: boolean;
    public bicicletaId!: number;
    public DataouHora!: DouH;
}

Solicitacao.init(
    {
        idSolicitacao: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idLocador: {
            type: DataTypes.INTEGER,
            references:{
                model: 'Users',
                key: 'id',
            },
            allowNull: false,
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
            type: DataTypes.ENUM(...Object.values(DouH)),  
        },
    },
    {
        sequelize,
        modelName: 'Solicitacao',
    }
);
Solicitacao.belongsTo(Bicicleta, { foreignKey: 'bicicletaId', as: 'bicicleta' });
Solicitacao.belongsTo(User, {foreignKey: 'idLocador', as: 'id'})

export default Solicitacao;