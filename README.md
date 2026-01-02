# 📊 Order Accumulator API

API backend desenvolvida em **Node.js** com foco em **regras de negócio**, **acúmulo de ordens** e **cálculo de exposição financeira por ativo**.  
O projeto segue boas práticas de arquitetura, testes automatizados e separação de responsabilidades. As tecnologias utilizadas foram escolhidas para seguir um bom padrão de código e também das tecnologias que tenho mais familiaridade.

---

## 🚀 Tecnologias Utilizadas

- Node.js (ESM)
- Express
- PostgreSQL
- Prisma ORM
- Jest (testes unitários)
- Supertest (testes de integração)
- Docker 
- ES Modules
- Clean Architecture (Service / Repository / Controller)

## 🧠 Funcionalidades

### Backend
- Criação de ordens de **compra (C)** e **venda (V)**
- Validação de dados de entrada
- Persistência em banco de dados
- Cálculo de exposição financeira por ativo
- Agrupamento de ordens por ativo
- API REST estruturada

# Insalação

## Clonar Repositório
    git clone https://github.com/g-molin4/OrderAccumulator.git
    cd OrderAccumulator

## Instalar dependências
    npm install

## Subir o Banco de dados Docker (docker-compose.yaml):
  
    docker compose up

## Configurar variáveis de ambiente
  Crie um arquivo .env:
    
    DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app_db?schema=public"
## Rodar Migrations
    npx prisma migrate dev

## Iniciar Servidor
    npm run dev

# 👨‍💻 Autor
  ### Gabriel Molina
  Desenvolvedor Backend / Full Stack





