import { DataTypes, HasManyGetAssociationsMixin, Model, Sequelize } from 'sequelize';
import sequelize from '../config/database';
import Bicicleta from './Bicicleta';
import User from './User';
import DouH from '../enums/DiaouHora';
import { AllowNull } from 'sequelize-typescript';
import Locacao from './Locacao';

class Solicitacao extends Model {
    public idSolicitacao!: number;
    public idLocatario!: number;
    public idBicicleta!: number;
    public isRespondido!: boolean;
    public isAceito!: boolean;
    public DiaouHora!: DouH;
}

Solicitacao.init(
    {
        idSolicitacao: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idLocatario: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id',
            },
            allowNull: false,
        },
        idBicicleta: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Bicicletas',
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
        DiaouHora: {
            type: DataTypes.ENUM(...Object.values(DouH)),
        },
    },
    {
        sequelize,
        modelName: 'Solicitacao',
    }
);
Solicitacao.belongsTo(Bicicleta, { foreignKey: 'idBicicleta', as: 'bicicleta' });
Solicitacao.belongsTo(User, { foreignKey: 'idLocatario', as: 'locatario' })

export default Solicitacao;