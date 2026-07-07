import { Link } from 'react-router-dom';
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
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Seu carrinho está vazio</h1>
        <Link to="/" className="text-indigo-600 hover:underline">
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
            className="flex items-center gap-4 bg-white rounded-lg shadow-sm p-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-md"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-500">{formatPrice(item.price)} / unidade</p>

              {/* Seletor de quantidade */}
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="px-2 py-0.5 hover:bg-gray-100 disabled:opacity-40"
                  >
                    -
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                    className="px-2 py-0.5 hover:bg-gray-100 disabled:opacity-40"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remover
                </button>
              </div>
            </div>

            {/* Subtotal por item */}
            <p className="font-semibold text-gray-900">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Resumo / total geral */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6 flex flex-col items-end gap-4">
        <div className="text-xl font-bold text-gray-900">
          Total: {formatPrice(totalPrice)}
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <Link
            to="/"
            className="flex-1 text-center border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50"
          >
            Continuar comprando
          </Link>

          <button
            onClick={handleFinalizarCompra}
            className="flex-1 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;