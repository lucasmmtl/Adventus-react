import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.username.trim() || !formData.password.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    
    navigate('/principal');
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
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Bem-vindo de volta</h1>
            <p className="text-slate-600 text-sm">Entre na sua conta para continuar</p>
          </header>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <Input
              label="Email ou usuário"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Digite seu email ou usuário"
              autoComplete="username"
              required
            />

            <Input
              label="Senha"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Digite sua senha"
              autoComplete="current-password"
              required
            />

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="w-4 h-4 accent-blue-800"
                />
                Lembrar de mim
              </label>
              <a href="#" className="text-blue-800 font-medium hover:text-blue-700 transition-colors duration-200">
                Esqueceu a senha?
              </a>
            </div>

            <Button type="submit" className="mt-2">
              Entrar
            </Button>
          </form>

          <div className="text-center mt-8 pt-8 border-t border-slate-200">
            <p className="text-slate-600 text-sm">
              Ainda não tem uma conta? <a href="/cadastro" className="text-blue-800 font-semibold hover:text-blue-700 transition-colors duration-200">Criar conta</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;