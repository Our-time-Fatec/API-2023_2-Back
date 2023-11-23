import path from 'path';
import express, { json } from 'express';
import routes from './routes';
import cors from 'cors';
import setupDatabase from './config/setup';

const port = process.env.PORT || 3001;
const app = express();

app.use(cors())
app.use(json());
app.use(routes);

app.listen(port, () => {
  console.log(`Servidor está executando na porta ${port}.`);
});



// Inicializar banco de dados e valores predefinidos
//setupDatabase();
