import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.fullname || !formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
      alert('Preencha todos os campos!');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    if (formData.password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres!');
      return;
    }

    if (!formData.terms) {
      alert('Você deve aceitar os termos de uso!');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      alert('Conta criada com sucesso!');
      navigate('/principal');
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-800 to-slate-800">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-10 backdrop-blur-sm border border-white/20">
          <header className="text-center mb-8">
            <img src="/img/Adventus.png" alt="Logo Adventus" className="w-20 h-20 mx-auto mb-6 rounded-xl" />
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Criar conta</h1>
            <p className="text-slate-600 text-sm">Junte-se à comunidade de desenvolvedores</p>
          </header>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <Input
              label="Nome completo"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Digite seu nome completo"
              autoComplete="name"
              required
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu email"
              autoComplete="email"
              required
            />

            <Input
              label="Nome de usuário"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Escolha um nome de usuário"
              autoComplete="username"
              required
            />

            <Input
              label="Senha"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Crie uma senha segura"
              autoComplete="new-password"
              required
            />

            <Input
              label="Confirmar senha"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirme sua senha"
              autoComplete="new-password"
              required
            />

            <label className="flex items-center gap-2 cursor-pointer text-slate-600 text-sm">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="w-4 h-4 accent-blue-800"
                required
              />
              Aceito os <a href="#" className="text-blue-800 font-medium hover:text-blue-700 transition-colors duration-200">termos de uso</a>
            </label>

            <Button type="submit" disabled={isLoading} className="mt-2">
              {isLoading ? 'Criando conta...' : 'Criar conta'}
            </Button>
          </form>

          <div className="text-center mt-8 pt-8 border-t border-slate-200">
            <p className="text-slate-600 text-sm">
              Já tem uma conta? <a href="/" className="text-blue-800 font-semibold hover:text-blue-700 transition-colors duration-200">Fazer login</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cadastro;