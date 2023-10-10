import { Router, Request, Response } from "express";
import userRoutes from "./userRoutes";
import marcaRoutes from "./marcaRoutes";
import modalidadeRoutes from "./modalidadeRoutes";
import bicicletaRoutes from "./bibicletaRoutes";
import fotosRoutes from "./fotoRoutes";
import locacaoRoutes from "./locacaoRoutes";
import solicitacaoRoutes from "./solicitacaoRoutes";
const routes = Router();
routes.use("/user", userRoutes);
routes.use("/marca", marcaRoutes)
routes.use("/modalidade", modalidadeRoutes)
routes.use("/bicicleta", bicicletaRoutes)
routes.use("/foto", fotosRoutes)
routes.use("/locacao", locacaoRoutes)
routes.use("/solicitacao", solicitacaoRoutes)

export default routes;
