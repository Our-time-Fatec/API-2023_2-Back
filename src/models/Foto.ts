import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Bicicleta from './Bicicleta';

class Foto extends Model {
    public id!: number;
    public url!: string;
    public id_bike!: number;
}

Foto.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_bike: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Bicicletas',
                key: 'id',
            },
        }
    },
    {
        sequelize,
        tableName: 'Fotos',
    }
);
Foto.belongsTo(Bicicleta, { foreignKey: 'id_bike', as: 'bicicleta' });


export default Foto;
