import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getProductById } from '../../services/api';
import { useCart } from '../../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
        setQuantity(1);
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

  function handleAddToCart() {
    addItem(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
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

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  const formattedPrice = product.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-md transition-colors -ml-3"
      >
        <ArrowLeft size={16} />
        Voltar para a loja
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-xl shadow-md object-cover border border-gray-100"
          />

          {isOutOfStock && (
            <span className="absolute top-4 left-4 bg-gray-900/80 text-white text-xs font-semibold px-3 py-1.5 rounded-md">
              Esgotado
            </span>
          )}

          {!isOutOfStock && isLowStock && (
            <span className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-semibold px-3 py-1.5 rounded-md">
              Últimas unidades
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</span>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">{product.name}</h1>

          <p className="text-3xl font-bold text-gray-900 mt-4">{formattedPrice}</p>

          <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>

          <div className="mt-4 text-sm text-gray-500 space-y-1 border border-indigo-100 rounded-lg p-4">
            {product.brand && <p><strong className="text-gray-700">Marca:</strong> {product.brand}</p>}
            {product.gender && <p><strong className="text-gray-700">Gênero:</strong> {product.gender}</p>}
            {product.color && <p><strong className="text-gray-700">Cor:</strong> {product.color}</p>}
            <p>
              <strong className="text-gray-700">Estoque:</strong>{' '}
              {product.stock > 0 ? `${product.stock} unidades disponíveis` : 'Esgotado'}
            </p>
          </div>

          {/* Seletor de quantidade */}
          <div className="flex items-center gap-4 mt-6">
            <span className="font-medium text-gray-700">Quantidade:</span>

            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={handleDecrease}
                className="px-3 py-2 text-lg hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-white transition-colors"
                disabled={quantity <= 1}
              >
                −
              </button>

              <span className="px-4 font-medium">{quantity}</span>

              <button
                onClick={handleIncrease}
                className="px-3 py-2 text-lg hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-white transition-colors"
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className={`mt-6 w-full md:w-auto px-8 py-3 rounded-lg font-medium transition-all active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:active:scale-100 ${
              justAdded
                ? 'bg-green-600 text-white'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
            disabled={isOutOfStock}
          >
            {isOutOfStock
              ? 'Indisponível'
              : justAdded
              ? '✓ Adicionado ao carrinho!'
              : 'Adicionar ao carrinho'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;