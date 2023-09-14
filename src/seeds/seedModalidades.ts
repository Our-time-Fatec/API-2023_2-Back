import Modalidade from "../models/Modalidade";

const seedModalidades = async () => {
    const modalidadesPredefinidas = [
        { nome: 'Ciclismo de pista' },
        { nome: 'Mountain Bike' },
        { nome: 'Ciclismo de estrada' },
        { nome: 'Gravel' },
        { nome: 'Bicicross' },
        { nome: 'Downhill' },
    ];

    try {
        await Modalidade.bulkCreate(modalidadesPredefinidas);
        console.log('Modalidades predefinidas cadastrados com sucesso.');
    } catch (error) {
        console.error('Erro ao cadastrar modalidades predefinidas:', error);
    }
};

export default seedModalidades;