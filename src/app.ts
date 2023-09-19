import path from 'path';
import { config } from 'dotenv';
import express, { json } from 'express';
import routes from './routes';
import cors from 'cors';
import setupDatabase from './config/setup';

config()
const diretorio = process.env.FOLDERPHOTOS2 || '';
const port = process.env.PORT || 3001;
const imagesDir = path.join(__dirname, diretorio)

const app = express();

app.use(cors())
app.use(json());
app.use('/images', express.static(imagesDir))
app.use(routes);

app.listen(port, () => {
  console.log(`Servidor está executando na porta ${port}.`);
});



// Inicializar banco de dados e valores predefinidos
//setupDatabase();
