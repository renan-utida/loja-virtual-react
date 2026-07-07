import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

function Header() {
  const { totalItems } = useCart();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-900">
          Loja<span className="text-indigo-600">Virtual</span>
        </Link>

        <Link to="/carrinho" className="relative flex items-center gap-2 text-gray-700 hover:text-indigo-600">
          <ShoppingCart size={24} />
          <span className="hidden sm:inline">Carrinho</span>

          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 sm:static sm:ml-1 bg-indigo-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;