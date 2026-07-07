import { Link, useRouteError } from 'react-router-dom';

function Error() {
  const error = useRouteError();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-indigo-600">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900 mt-4">
        Ops! Página não encontrada
      </h2>
      <p className="text-gray-500 mt-2 max-w-md">
        {error?.statusText || error?.message
          ? 'Algo deu errado ao carregar essa página.'
          : 'A página que você procura não existe ou foi movida.'}
      </p>

      <Link
        to="/"
        className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Voltar para a loja
      </Link>
    </div>
  );
}

export default Error;