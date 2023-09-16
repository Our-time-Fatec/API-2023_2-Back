import express, { json } from 'express';
import routes from './routes';
import cors from 'cors';
import setupDatabase from './config/setup';

const app = express();

app.use(cors())
app.use(json());
app.use(routes);

app.listen(3001, () => {
  console.log('Servidor está executando na porta 3001.');
});



// Inicializar banco de dados e valores predefinidos
//setupDatabase();
