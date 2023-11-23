import Bicicleta from "../models/Bicicleta";
import Locacao from "../models/Locacao";
import User from "../models/User";


class avaliacaoController {

    async updateAvaliacoes(idLocador: number, bicicletaId: number){

    
      const bicicletasDoLocador = await Bicicleta.findAll({
        where: {
            donoId: idLocador,
        },
        attributes: ['id'],
        });

        const idBicicletas = bicicletasDoLocador.map((bicicleta) => bicicleta.id);

        const locacoesLocador = await Locacao.findAll({
            where: {bicicletaId : idBicicletas}
        });
        const locacoesBike = await Locacao.findAll({
            where: {bicicletaId}
        });

        const locador = await User.findByPk(idLocador)
        if(!locador){
            return 'Locador não existe!'
        }
        const bike = await Bicicleta.findByPk(bicicletaId)
        if(!bike){
            return 'Bicicleta não existe!'
        }

        
       // Calculate average rating for locador
        const locadorAvaliacoes = locacoesLocador.map((locacao) => parseFloat(locacao.avaliacaoDono)).filter((avaliacao) => !isNaN(avaliacao));
        const locadorMediaAvaliacoes = locadorAvaliacoes.length > 0 ? locadorAvaliacoes.reduce((a, b) => a + b) / locadorAvaliacoes.length : 0;

        // Calculate average rating for bike
        const bikeAvaliacoes = locacoesBike.map((locacao) => parseFloat(locacao.avaliacaoDono)).filter((avaliacao) => !isNaN(avaliacao));
        const bikeMediaAvaliacoes = bikeAvaliacoes.length > 0 ? bikeAvaliacoes.reduce((a, b) => a + b) / bikeAvaliacoes.length : 0;

        locador.avaliacao = locadorMediaAvaliacoes;
        bike.avaliacao = bikeMediaAvaliacoes;

        await locador.save();
        await bike.save();

      return 'Avaliações atualizadas com sucesso'
    }
  
}

export default new avaliacaoController();
