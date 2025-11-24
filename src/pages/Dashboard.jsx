import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Card from '../components/ui/Card'

const Dashboard = () => {
  const { user } = useAuth()
  const [contacts, setContacts] = useState([])
  const [friendRequests, setFriendRequests] = useState([])
  const [posts, setPosts] = useState([])
  const [friends, setFriends] = useState([])

  useEffect(() => {
    if (user) {
      fetchContacts()
      fetchFriendRequests()
      fetchUserPosts()
      fetchFriends()
    }
  }, [user])

  const fetchContacts = async () => {
    const { data } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })
    setContacts(data || [])
  }

  const fetchFriendRequests = async () => {
    const { data } = await supabase
      .from('friendships')
      .select('*')
      .eq('addressee_id', user.id)
      .eq('status', 'pending')
    setFriendRequests(data || [])
  }

  const fetchUserPosts = async () => {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    setPosts(data || [])
  }

  const fetchFriends = async () => {
    const { data } = await supabase
      .from('friendships')
      .select('*')
      .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`)
      .eq('status', 'accepted')
    setFriends(data || [])
  }

  return (
    <div className="font-inter text-slate-800 bg-slate-100 min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-6xl mx-auto px-8 py-32 w-full">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">
          Painel Administrativo
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <h3 className="text-2xl font-bold text-blue-800">{contacts.length}</h3>
            <p className="text-slate-600">Mensagens de Contato</p>
          </Card>
          <Card className="text-center">
            <h3 className="text-2xl font-bold text-blue-800">{friendRequests.length}</h3>
            <p className="text-slate-600">Convites Pendentes</p>
          </Card>
          <Card className="text-center">
            <h3 className="text-2xl font-bold text-blue-800">{friends.length}</h3>
            <p className="text-slate-600">Amigos</p>
          </Card>
          <Card className="text-center">
            <h3 className="text-2xl font-bold text-blue-800">{posts.length}</h3>
            <p className="text-slate-600">Seus Posts</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Mensagens de Contato</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {contacts.map((contact) => (
                <div key={contact.id} className="border-b pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{contact.name}</h4>
                    <span className="text-xs text-slate-500">
                      {new Date(contact.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-1">{contact.email}</p>
                  <p className="text-sm text-slate-700">{contact.message}</p>
                </div>
              ))}
              {contacts.length === 0 && (
                <p className="text-slate-500 text-center">Nenhuma mensagem ainda</p>
              )}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-4">Convites de Amizade</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {friendRequests.map((request) => (
                <div key={request.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                  <img 
                    src="/img/usuario.png" 
                    alt="Usuário"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="font-medium">Novo convite de amizade</p>
                    <p className="text-sm text-slate-500">
                      {new Date(request.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {friendRequests.length === 0 && (
                <p className="text-slate-500 text-center">Nenhum convite pendente</p>
              )}
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Dashboard