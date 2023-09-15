import sequelize from "./database";
import seeds from "../seeds";

export default async function setupDatabase() {
    try {
        await sequelize.sync()
            .then(() => {
                console.log('Banco de dados sincronizado com sucesso.');
            })
            .catch((error) => {
                console.error('Erro ao sincronizar o banco de dados:', error);
            });

        await seeds();
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados ou inserir valores predefinidos:', error);
    }
};