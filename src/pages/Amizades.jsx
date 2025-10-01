import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Amizades = () => {
  const [convites, setConvites] = useState([
    {
      id: 1,
      name: 'Ana Oliveira',
      avatar: '/img/usuario.png',
      mutualFriends: 5,
      bio: 'Desenvolvedora Frontend especializada em React e Vue.js'
    },
    {
      id: 2,
      name: 'Carlos Mendes',
      avatar: '/img/usuario.png',
      mutualFriends: 12,
      bio: 'Full Stack Developer | Node.js | Python | AWS'
    },
    {
      id: 3,
      name: 'Lucia Ferreira',
      avatar: '/img/usuario.png',
      mutualFriends: 3,
      bio: 'UX/UI Designer apaixonada por criar experiências incríveis'
    },
    {
      id: 4,
      name: 'Roberto Silva',
      avatar: '/img/usuario.png',
      mutualFriends: 8,
      bio: 'DevOps Engineer | Docker | Kubernetes | CI/CD'
    }
  ]);

  const handleAccept = (id) => {
    setConvites(convites.filter(convite => convite.id !== id));
  };

  const handleReject = (id) => {
    setConvites(convites.filter(convite => convite.id !== id));
  };

  return (
    <div className="font-inter text-slate-800 bg-slate-100 min-h-screen">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-8 py-32">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">Convites de Amizade</h1>
        
        {convites.length === 0 ? (
          <Card className="p-8 text-center">
            <i className="fas fa-users text-4xl text-slate-400 mb-4"></i>
            <h2 className="text-xl font-semibold text-slate-600 mb-2">Nenhum convite pendente</h2>
            <p className="text-slate-500">Você não tem convites de amizade no momento.</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {convites.map((convite) => (
              <Card key={convite.id} className="p-6">
                <div className="flex items-start gap-6">
                  <img 
                    src={convite.avatar} 
                    alt={convite.name} 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-800 mb-1">{convite.name}</h3>
                    <p className="text-slate-600 mb-2">{convite.bio}</p>
                    <p className="text-sm text-slate-500 mb-4">
                      {convite.mutualFriends} amigos em comum
                    </p>
                    
                    <div className="flex gap-3">
                      <Button 
                        onClick={() => handleAccept(convite.id)}
                        className="px-6 py-2"
                      >
                        <i className="fas fa-check mr-2"></i>
                        Aceitar
                      </Button>
                      <Button 
                        variant="secondary"
                        onClick={() => handleReject(convite.id)}
                        className="px-6 py-2"
                      >
                        <i className="fas fa-times mr-2"></i>
                        Recusar
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Amizades;