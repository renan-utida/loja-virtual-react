# 🛍️ Loja Virtual — Desafio Frontend React

Aplicação de loja virtual desenvolvida como desafio técnico para vaga de Frontend React Developer. Consome uma API REST simulada com JSON Server, com listagem de produtos, página de detalhes, carrinho de compras funcional e filtros de busca.

## 🚀 Demonstração

> Adicione aqui um GIF ou prints da aplicação, se quiser.

## ✨ Funcionalidades

- Listagem de produtos com imagem, nome, preço e categoria
- Busca de produtos por nome
- Filtro por categoria
- Paginação
- Página de detalhes do produto, com seleção de quantidade
- Carrinho de compras completo:
  - Adicionar e remover itens
  - Atualizar quantidade
  - Cálculo automático de subtotal e total
  - Persistência do carrinho no navegador (localStorage)
- Página de erro (404) para rotas inexistentes
- Layout responsivo (mobile, tablet e desktop)

## 🛠️ Tecnologias utilizadas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/) (`createBrowserRouter`)
- [Tailwind CSS](https://tailwindcss.com/)
- [JSON Server](https://github.com/typicode/json-server) — API REST simulada
- [Lucide React](https://lucide.dev/) — ícones
- Context API + `useReducer` — gerenciamento de estado do carrinho

## 📁 Estrutura do projeto

    src/
      components/     # Componentes reutilizáveis (Header, Footer, ProductCard)
      pages/          # Páginas da aplicação (Home, ProductDetail, Cart, Error)
      context/        # Context API do carrinho (CartContext, CartReducer)
      services/       # Camada de comunicação com a API (api.js)
    dbTeste.json      # Base de dados mockada, servida pelo JSON Server

## ⚙️ Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão 18 ou superior)

### Passo a passo

1. Clone o repositório:

       git clone https://github.com/renan-utida/loja-virtual-react
       cd loja-virtual-react

2. Instale as dependências:

       npm install

3. **Em um terminal**, inicie o JSON Server (API simulada):

       npm run server

   O servidor sobe em `http://localhost:3001`.

4. **Em outro terminal**, inicie a aplicação React:

       npm run dev

   A aplicação sobe em `http://localhost:5173`.

> ⚠️ É necessário manter os dois comandos rodando simultaneamente (em terminais separados) para a aplicação funcionar corretamente, já que o front-end consome os dados através do JSON Server.

## 📝 Sobre os dados

Os produtos são mockados no arquivo `dbTeste.json`, na raiz do projeto, e servidos como uma API REST através do JSON Server. As imagens dos produtos ficam em `public/images/products/`.

## 👤 Autor

Desenvolvido por Renan Utida, como parte de um processo seletivo para vaga de Frontend - React.
