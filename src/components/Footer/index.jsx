function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-3">
            Loja<span className="text-indigo-400">Virtual</span>
          </h3>
          <p className="text-sm text-gray-400">
            Produtos esportivos de qualidade para o seu treino, do dia a dia à alta performance.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Institucional</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-white transition-colors cursor-pointer">Sobre nós</li>
            <li className="hover:text-white transition-colors cursor-pointer">Política de trocas</li>
            <li className="hover:text-white transition-colors cursor-pointer">Termos de uso</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Contato</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>contato@lojavirtual.com</li>
            <li>(11) 4000-0000</li>
            <li>São Paulo, SP</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © {currentYear} LojaVirtual. Todos os direitos reservados.
      </div>
    </footer>
  );
}

export default Footer;