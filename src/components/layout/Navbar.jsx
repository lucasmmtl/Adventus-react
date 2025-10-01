import { useState } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50 shadow-sm">
      <div className="flex items-center">
        <a href="/">
          <img
            src="/img/Adventus.png"
            alt="Adventus - Página inicial"
            className="h-12 w-auto rounded-lg"
          />
        </a>
      </div>

      <ul className="hidden md:flex items-center gap-8">
        <li>
          <a
            href="/"
            className="block text-slate-800 font-medium hover:text-blue-800 hover:bg-blue-800/10 px-4 py-2 rounded-md transition-all duration-200"
          >
            Início
          </a>
        </li>
        <li>
          <a
            href="/posts"
            className="block text-slate-800 font-medium hover:text-blue-800 hover:bg-blue-800/10 px-4 py-2 rounded-md transition-all duration-200"
          >
            Posts
          </a>
        </li>
        <li>
          <a
            href="/amizades"
            className="block text-slate-800 font-medium hover:text-blue-800 hover:bg-blue-800/10 px-4 py-2 rounded-md transition-all duration-200"
          >
            Amizades
          </a>
        </li>

        <li>
          <a
            href="/faq"
            className="block text-slate-800 font-medium hover:text-blue-800 hover:bg-blue-800/10 px-4 py-2 rounded-md transition-all duration-200"
          >
            FAQ
          </a>
        </li>
        <li>
          <a
            href="/contato"
            className="block text-slate-800 font-medium hover:text-blue-800 hover:bg-blue-800/10 px-4 py-2 rounded-md transition-all duration-200"
          >
            Contato
          </a>
        </li>
      </ul>

      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="bg-transparent border-none p-0 cursor-pointer"
        >
          <img
            src="/img/usuario.png"
            alt="Menu do usuário"
            className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-slate-200 hover:border-blue-800 transition-colors duration-200"
          />
        </button>

        <div
          className={`absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-lg shadow-md py-2 z-10 transition-all duration-300 origin-top-right ${
            isDropdownOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }`}
        >
          <a
            href="#perfil"
            className="block px-4 py-2 text-slate-800 hover:bg-slate-100 hover:text-blue-800 transition-colors duration-200"
          >
            Meu Perfil
          </a>
          <a
            href="#configuracoes"
            className="block px-4 py-2 text-slate-800 hover:bg-slate-100 hover:text-blue-800 transition-colors duration-200"
          >
            Configurações
          </a>
          <hr className="my-1 border-slate-200" />
          <a
            href="/"
            className="block px-4 py-2 text-slate-800 hover:bg-slate-100 hover:text-blue-800 transition-colors duration-200"
          >
            Sair
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
