import Marca from "../models/Marca";

const seedMarcas = async () => {
    const marcasPredefinidas = [
        { nome: 'Caloi' },
        { nome: 'SENSE' },
        { nome: 'OGGI' },
        { nome: 'Soul Cycles' },
        { nome: 'Viking' },
        { nome: 'SCOTT' },
        { nome: 'Giant' },
        { nome: 'Merida' }
    ];

    try {
        await Marca.bulkCreate(marcasPredefinidas);
        console.log('Marcas predefinidas cadastradas com sucesso.');
    } catch (error) {
        console.error('Erro ao cadastrar Marcas predefinidas:', error);
    }
};

export default seedMarcas;