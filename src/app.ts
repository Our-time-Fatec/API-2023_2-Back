import express from 'express';
import routes from './routes';
import cors from 'cors';
import setupDatabase from './config/setup';

const app = express();

app.use(express.json());
app.use(cors())

app.listen(3000, () => {
  console.log('Servidor está executando na porta 3000.');
});

app.use(routes);

// Inicializar banco de dados e valores predefinidos
setupDatabase();
