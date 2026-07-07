import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../../services/api';

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
        setQuantity(1); // reseta a quantidade sempre que trocar de produto
      } catch (err) {
        setError('Não foi possível carregar este produto.');
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  function handleDecrease() {
    setQuantity((prev) => Math.max(1, prev - 1));
  }

  function handleIncrease() {
    setQuantity((prev) => Math.min(product.stock, prev + 1));
  }

  if (loading) {
    return <p className="text-center mt-10">Carregando produto...</p>;
  }

  if (error || !product) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-600">{error || 'Produto não encontrado.'}</p>
        <Link to="/" className="text-indigo-600 underline mt-2 inline-block">
          Voltar para a loja
        </Link>
      </div>
    );
  }

  const formattedPrice = product.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link to="/" className="text-indigo-600 hover:underline text-sm">
        &larr; Voltar para a loja
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-lg shadow-md object-cover"
        />

        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase">{product.category}</span>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">{product.name}</h1>

          <p className="text-3xl font-bold text-gray-900 mt-4">{formattedPrice}</p>

          <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>

          <div className="mt-4 text-sm text-gray-500 space-y-1">
            {product.brand && <p><strong>Marca:</strong> {product.brand}</p>}
            {product.gender && <p><strong>Gênero:</strong> {product.gender}</p>}
            {product.color && <p><strong>Cor:</strong> {product.color}</p>}
            <p>
              <strong>Estoque:</strong>{' '}
              {product.stock > 0 ? `${product.stock} unidades disponíveis` : 'Esgotado'}
            </p>
          </div>

          {/* Seletor de quantidade */}
          <div className="flex items-center gap-4 mt-6">
            <span className="font-medium text-gray-700">Quantidade:</span>

            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={handleDecrease}
                className="px-3 py-1 text-lg hover:bg-gray-100"
                disabled={quantity <= 1}
              >
                -
              </button>

              <span className="px-4">{quantity}</span>

              <button
                onClick={handleIncrease}
                className="px-3 py-1 text-lg hover:bg-gray-100"
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>

          <button
            className="mt-6 w-full md:w-auto bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={product.stock === 0}
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;