# Documentação do Quadro Societário Web - Teste Prático

Este é uma aplicação web para gerenciar o cadastro de empresas e sócios.

## Endpoints da API

A seguir estão os endpoints disponíveis na API:

### Cadastrar Empresas

- **URL:** `http://localhost:3000/empresa/cadastrar`
- **Descrição:** Permite cadastrar uma nova empresa.
- **Método HTTP:** POST
- **Corpo da Requisição:** JSON com os dados da empresa (nome, email, CNPJ).
- **Retorno:** Retorna os detalhes da empresa recém-cadastrada.

### Cadastrar Sócios

- **URL:** `http://localhost:3000/socio/cadastrar`
- **Descrição:** Permite cadastrar um novo sócio.
- **Método HTTP:** POST
- **Corpo da Requisição:** JSON com os dados do sócio (nome, email, CPF e ID da empresa).
- **Retorno:** Retorna os detalhes do sócio recém-cadastrado.

### Sócios Cadastrados na Empresa

- **URL:** `http://localhost:3000/empresa/detalhes/{id}`
- **Descrição:** Exibe os detalhes da empresa e a lista de sócios cadastrados nela.
- **Método HTTP:** GET
- **Parâmetro:** ID da empresa.
- **Retorno:** Retorna os detalhes da empresa e a lista de sócios cadastrados nela.

### Lista de Empresas Cadastradas

- **URL:** `http://localhost:3000/empresas`
- **Descrição:** Exibe uma lista das empresas cadastradas no sistema.
- **Método HTTP:** GET
- **Retorno:** Retorna uma lista das empresas cadastradas.

## Setup do Projeto

1. Clone o repositório do projeto: `git clone https://github.com/lvxzxn/quadro-societario-web.git`
2. Instale as dependências: `npm install`
3. Execute o projeto: `npm start`
4. Acesse a aplicação no navegador: `http://localhost:3000`

## Tecnologias Utilizadas

- React.js
- Symfony
- PHP
- MySQL

## Autor

Este projeto foi desenvolvido por [Luiz Guilherme](https://github.com/lvxzxn).

---
**Observação:** Certifique-se de substituir os placeholders (como  `http://localhost:3000`) pelos valores reais do seu projeto.
