import { DataTypes, HasManyGetAssociationsMixin, Model, Sequelize } from 'sequelize';
import sequelize from '../config/database';

class Solicitacao extends Model{
    public  id!: number;

}