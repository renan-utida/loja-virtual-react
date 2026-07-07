import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addItem } = useCart();

  const formattedPrice = product.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  function handleAddToCart() {
    addItem(product);
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
      <Link to={`/produto/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover"
        />
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs text-gray-500 uppercase">{product.category}</span>

        <Link to={`/produto/${product.id}`}>
          <h3 className="font-semibold text-gray-800 mt-1 hover:text-indigo-600">
            {product.name}
          </h3>
        </Link>

        <p className="text-lg font-bold text-gray-900 mt-2">{formattedPrice}</p>

        <button
          onClick={handleAddToCart}
          className="mt-auto pt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}

export default ProductCard;