<h1 align="center">Cinema-API</h1>
<h1>
    <a href="https://nodejs.org/en/">🔗
     NodeJS
     </a>
     <a href="https://expressjs.com/"> |
     Express
     </a>
     <a href="https://www.mongodb.com/"> |
     PostgreSQL
     </a>
     <a href="https://www.mongodb.com/"> |
     TypeScript
     </a>
     <a href="https://www.mongodb.com/"> |
     TypeORM
     </a>
</h1>
<p>
🚀 Sistema de cadastro de filmes. Os funcionários dependendo do seu papel exerce uma função diferente no sistema. 

Podendo cadastrar um filme, porém ainda vai para autorização, outro usuário que irá autorizar e tem usuário que ainda irá remover do sistema.
</p>

<img src="https://img.shields.io/static/v1?label=CinemaAPI&message=Greg%C3%B3rioNeto&color=7159c1&style=for-the-badge&logo=ghost">

<h1 align="center">
  <img alt="comics-store-api" title="#ComicsStoreAPI" src="https://github.com/igregorioneto/comic-store-api/blob/main/assets/comic1.png?raw=true" />
</h1>

<p align="center">
 <a href="#objetivo">Objetivo</a> •
 <a href="#tecnologias">Como rodar o projeto / Cómo ejecutar el proyecto</a> 
</p>

<h2 align="center">
Objetivo:
</h2>

<p align="center">
<ul>
    <li>
    Cadastrar funcionários
    </li>
    <li>
    Login no sistema
    </li>
    <li>
    Listagem dos funcionários
    </li>
    <li>
    Realizar cadastro dos Filmes (Somente com papel 'creator')
    </li>
    <li>
    Autorizar o cadastro dos Filmes (Somente com papel 'authorized')
    </li>
    <li>
    Deletar os Filmes cadastrados que estão autorizados (Somente com papel 'manager')
    </li>
</ul>
</p>

<h2 align="center">
Como rodar o projeto | Cómo ejecutar el proyecto:
</h2>

```
Cadastrar funcionários: 
    POST => /employee
    body:
        {
            "name": "Aldaberto",
            "email": "aldaberto@teste.com",
            "password": "123456",
            "roles": "authorizer"
        }

Listagem dos funcionários: 
    GET => /employee

Login no sistema:
    POST => /auth
    body:
        {
            "email": "aldaberto@teste.com",
            "password": "123456",
        }

Realizar cadastro dos Filmes (Somente com papel 'creator'):
    GET => /movie
    Headers:
        key: x-access-token => Value: token

    POST => /movie
    Headers:
        key: x-access-token => Value: token
    body:
        {
            "name": "Liga da Justiça",
            "category": "ação"
        }

Autorizar o cadastro dos Filmes (Somente com papel 'authorized'):
   GET => /movie-authorized
   Headers:
        key: x-access-token => Value: token

   POST => /movie-authorized/id_do_filme_para_autorizar
   Headers:
        key: x-access-token => Value: token
   
Deletar os Filmes cadastrados que estão autorizados (Somente com papel 'manager'):
    DELETE => /movie-authorized/id_do_filme_para_deletar
    Headers:
        key: x-access-token => Value: token

```

<p align="center">

<h3>Development server</h3>
Rodar o `npm run dev` usando url base: <a>http://localhost:3000/</a>
</p>