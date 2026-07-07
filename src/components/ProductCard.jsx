import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addItem } = useCart();

  const formattedPrice = product.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  function handleAddToCart() {
    addItem(product);
  }

  return (
    <div className="group bg-white rounded-xl shadow-sm overflow-hidden flex flex-col border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <Link to={`/produto/${product.id}`} className="relative block overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {isOutOfStock && (
          <span className="absolute top-3 left-3 bg-gray-900/80 text-white text-xs font-semibold px-2 py-1 rounded-md">
            Esgotado
          </span>
        )}

        {!isOutOfStock && isLowStock && (
          <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
            Últimas unidades
          </span>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</span>

        <Link to={`/produto/${product.id}`}>
          <h3 className="font-semibold text-gray-800 mt-1 group-hover:text-indigo-600 transition-colors line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        <p className="text-lg font-bold text-gray-900 mt-2 mb-4">{formattedPrice}</p>

        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="mt-auto w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 active:scale-95 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          {isOutOfStock ? 'Indisponível' : 'Adicionar ao carrinho'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;