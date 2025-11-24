import { useAuth } from '../contexts/AuthContext'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import Card from './ui/Card'
import Button from './ui/Button'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="font-inter text-slate-800 bg-slate-100 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-8">
          <Card className="text-center max-w-md">
            <i className="fas fa-lock text-4xl text-slate-400 mb-4"></i>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Acesso Restrito</h2>
            <p className="text-slate-600 mb-6">Você precisa estar logado para acessar esta página.</p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => window.location.href = '/login'}>Entrar</Button>
              <Button variant="secondary" onClick={() => window.location.href = '/cadastro'}>Cadastrar</Button>
            </div>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return children
}

export default ProtectedRoute