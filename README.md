<h1 align="center"> BACK-END  </h1>

###  🧑‍💻- Tecnologias

Tecnologias e ferramentas utilizadas no projeto: `Typescript, NodeJS / Express.js, MySql, Sequelize, Insomnia`

## ⚙️ - Como Executar a aplicação
```bash
# Baixe este repositório ou clone pelo Git usando o comando:
$ git clone https://github.com/Our-time-Fatec/API-2023_2-Back.git

# Acesse a pasta do projeto
$ cd API-BACK

# renomear o arquivo chamado ".env.local" para '.env'

# Utilizando o mysql Workbench crie o banco com o comando
'CREATE DATABASE api_bicicleta'

# No arquivo principal do projeto 'app.ts' descomente a linha 18 para criar as entidades do banco e inserir valores pre-definidos de marca e modalidade.
! Após executar pela primeira vez comente novamente a linha.

# Instale as dependências do projeto
$ yarn 
ou 
$ npm i

# Inicie o Projeto
$ yarn start 
ou 
$ npm start
```

## 🪧 - Rotas da aplicação
<div align="center">
  
|                                                                    Tipo | Rota                       | Ação                              |
| ----------------------------------------------------------------------: | :------------------------- | :-------------------------------- |
|                                                                    <hr> | <hr>                       | **Controle de usuários**          |
|    [![](https://img.shields.io/badge/GET-2E8B57?style=for-the-badge)]() | `/user/`                   | Listagem de usuários              |
|    [![](https://img.shields.io/badge/GET-2E8B57?style=for-the-badge)]() | `/user/{userId}`           | Dados de um usuário específico    |
|   [![](https://img.shields.io/badge/POST-4682B4?style=for-the-badge)]() | `/user/register`           | Cadastro de usuários              |
|    [![](https://img.shields.io/badge/PUT-9370DB?style=for-the-badge)]() | `/user/{userid}`           | Alteração do perfil do usuário    |
| [![](https://img.shields.io/badge/DELETE-CD853F?style=for-the-badge)]() | `/user/{userId}`           | Exclusão de um usuário específico |
|                                                                    <hr> | <hr>                       | **Controle de bicicletas**        |
|    [![](https://img.shields.io/badge/GET-2E8B57?style=for-the-badge)]() | `/bicicleta/`              | Listagem de bicicletas            |
|    [![](https://img.shields.io/badge/GET-2E8B57?style=for-the-badge)]() | `/bicicleta/{bicicletaId}` | Dados de uma bicicleta específico |
|   [![](https://img.shields.io/badge/POST-4682B4?style=for-the-badge)]() | `/bicicleta/`              | Cadastro de bicicleta             |
|    [![](https://img.shields.io/badge/PUT-9370DB?style=for-the-badge)]() | `/bicicleta/{bicicletaId}` | Alteração de bicicleta            |
| [![](https://img.shields.io/badge/DELETE-CD853F?style=for-the-badge)]() | `/bicicleta/{bicicletaId}` | Exclusão de uma bicicleta         |
|                                                                    <hr> | <hr>                       | **Controle de Fotos**             |
|   [![](https://img.shields.io/badge/POST-4682B4?style=for-the-badge)]() | `/foto/upload`             | Upload de uma foto                |
| [![](https://img.shields.io/badge/DELETE-CD853F?style=for-the-badge)]() | `/foto/{fotoId}`           | Exclusão de uma bicicleta         |


</div>

## 🗂️ - Estruturação das pastas

| Pasta                    | Definição                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| 📁 src/                   | Arquivos com o código fonte do projeto                                                     |
| 📁 src/config             | Arquivos de configuração e inicialização do banco                                          |
| 📁 src/controllers        | Arquivos com os métodos de requisição das rotas                                            |
| 📁 src/models             | Arquivos com as entidades do banco de dados do projeto                                     |
| 📁 src/enums              | Arquivos de padronização de entrada para campos específicos no banco de dados              |
| 📁 src/middlewares/       | Arquivos para serviços de intermédio para rotas ex: autenticação, mensageria, etc          |
| 📁 src/routes/            | Arquivos para expor rotas de controles da aplicação                                        |
| 📁 src/seeds/             | Arquivos para inserir dados pré-definidos no banco                                         |
| 📄 src/app.ts             | Arquivo principal de inicialização do projeto                                              |
| 📄 src/routes/index.ts    | Arquivo para gerenciar as rotas do projeto                                                 |
| 📄 src/seeds/index.ts     | Arquivo usado para gerar os dados pré-definidos no banco                                   |
| 📄 src/config/database.ts | configurar as conexões com o banco de dados utilizando o Sequelize                         |
| 📄 tsconfig.json          | Arquivo usado para configurar o typescript como sintaxe, organização de arquivos, etc.     |
| 📄 package.json           | Arquivo usado gerenciar as dependencias do projeto com o Yarn e compor scripts de terminal |
