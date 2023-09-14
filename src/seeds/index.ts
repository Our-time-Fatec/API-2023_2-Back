import seedMarcas from "./seedMarcas";
import seedModalidades from "./seedModalidades";

export default async function seeds(){
    await seedModalidades();
    await seedMarcas();
}