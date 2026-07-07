const BASE_URL = 'http://localhost:3001';

// Busca todos os produtos
export async function getProducts() {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new Error('Erro ao buscar produtos');
  }

  return response.json();
}

// Busca um produto específico pelo id
export async function getProductById(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error('Erro ao buscar o produto');
  }

  return response.json();
}