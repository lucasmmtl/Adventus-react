const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-800 to-slate-700 text-white px-8 py-12 mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <img src="/img/Adventus-Logo.png" alt="Logo Adventus" className="h-12 mb-4 rounded-lg" />
          <p className="text-white/80 text-sm mb-2">Adventus © 2025. Todos os direitos reservados.</p>
          <p className="text-white/80 text-sm">Conectando desenvolvedores ao redor do mundo.</p>
        </div>

        <div>
          <h4 className="mb-4 text-lg font-semibold">Links Úteis</h4>
          <ul className="flex flex-col gap-2">
            <li><a href="#politica" className="text-white/80 hover:text-white transition-colors duration-200 text-sm">Política de Privacidade</a></li>
            <li><a href="#termos" className="text-white/80 hover:text-white transition-colors duration-200 text-sm">Termos de Uso</a></li>
            <li><a href="/contato" className="text-white/80 hover:text-white transition-colors duration-200 text-sm">Contato</a></li>
            <li><a href="#ajuda" className="text-white/80 hover:text-white transition-colors duration-200 text-sm">Central de Ajuda</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-lg font-semibold">Redes Sociais</h4>
          <div className="flex gap-4">
            <a
              href="https://facebook.com/Adventus"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-blue-800 text-white rounded-lg hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 text-xl"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com/Adventus"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-blue-800 text-white rounded-lg hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 text-xl"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://instagram.com/Adventus"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-blue-800 text-white rounded-lg hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 text-xl"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;