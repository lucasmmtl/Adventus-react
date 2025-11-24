import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const Cadastro = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem')
      setLoading(false)
      return
    }

    const { error } = await signUp(formData.email, formData.password, {
      full_name: formData.name
    })
    
    if (error) {
      setError(error.message)
    } else {
      alert('Cadastro realizado! Verifique seu email para confirmar a conta.')
      navigate('/login')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/img/Adventus.png" alt="Adventus" className="h-16 mx-auto mb-4 rounded-lg" />
          <h1 className="text-2xl font-bold text-slate-800">Criar Conta</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Nome completo"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite seu nome"
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite seu email"
            required
          />

          <Input
            label="Senha"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Digite sua senha"
            required
          />

          <Input
            label="Confirmar senha"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirme sua senha"
            required
          />

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Criando conta...' : 'Criar conta'}
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-slate-600">
            Já tem uma conta?{' '}
            <a href="/login" className="text-blue-800 hover:underline">
              Entrar
            </a>
          </p>
        </div>
      </Card>
    </div>
  )
}

export default Cadastro