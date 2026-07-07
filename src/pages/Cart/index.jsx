import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

function Cart() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();

  function formatPrice(value) {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  function handleFinalizarCompra() {
    alert('Compra finalizada com sucesso! Obrigado pela preferência.');
    clearCart();
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center flex flex-col items-center">
        <ShoppingBag size={56} className="text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Seu carrinho está vazio</h1>
        <p className="text-gray-500 mb-6">Que tal dar uma olhada nos nossos produtos?</p>
        <Link
          to="/"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Voltar para a loja
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Meu Carrinho</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-500">{formatPrice(item.price)} / unidade</p>

              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="px-2 py-1 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                  >
                    −
                  </button>
                  <span className="px-3 text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                    className="px-2 py-1 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-md transition-colors"
                  aria-label="Remover item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <p className="font-semibold text-gray-900">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-end gap-4">
        <div className="w-full flex justify-between items-center text-sm text-gray-500 border-b border-gray-100 pb-4">
          <span>Subtotal</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>

        <div className="w-full flex justify-between items-center text-xl font-bold text-gray-900">
          <span>Total</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>

        <div className="flex gap-3 w-full sm:w-auto mt-2">
          <Link
            to="/"
            className="flex-1 text-center border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Continuar comprando
          </Link>

          <button
            onClick={handleFinalizarCompra}
            className="flex-1 bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 active:scale-95 transition-all"
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;