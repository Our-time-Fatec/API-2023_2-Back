import sequelize from "./database";
import seeds from "../seeds";
import User from "../models/User";
import Marca from "../models/Marca";
import Modalidade from "../models/Modalidade";
import Bicicleta from "../models/Bicicleta";
import Foto from "../models/Foto";
import Locacao from "../models/Locacao";

export default async function setupDatabase() {
    try {
        await sequelize.sync()
            .then(() => {
                console.log('Banco de dados sincronizado com sucesso.');
            })
            .catch((error) => {
                console.error('Erro ao sincronizar o banco de dados:', error);
            });

        //await seeds();
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados ou inserir valores predefinidos:', error);
    }
};