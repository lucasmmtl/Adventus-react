import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FeatureCard from '../components/ui/FeatureCard';

const Principal = () => {
  const features = [
    {
      icon: '🚀',
      title: 'Comunidade Ativa',
      description: 'Milhares de desenvolvedores compartilhando conhecimento diariamente'
    },
    {
      icon: '💡',
      title: 'Conteúdo de Qualidade',
      description: 'Tutoriais, artigos e discussões sobre as tecnologias mais atuais'
    },
    {
      icon: '🤝',
      title: 'Networking',
      description: 'Conecte-se com profissionais e encontre oportunidades de carreira'
    },
    {
      icon: '📚',
      title: 'Aprendizado Contínuo',
      description: 'Recursos educacionais para todos os níveis de experiência'
    },
    {
      icon: '🔒',
      title: 'Ambiente Seguro',
      description: 'Plataforma confiável com moderação ativa e proteção de dados'
    },
    {
      icon: '⚡',
      title: 'Performance',
      description: 'Interface rápida e responsiva para uma experiência fluida'
    }
  ];

  return (
    <div className="font-inter text-slate-800 bg-slate-100">
      <Navbar />
      
      <main>
        <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 max-w-6xl mx-auto px-8 py-32 min-h-[calc(100vh-200px)]">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 leading-tight">
              Bem-vindo ao Adventus
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              O Adventus é a rede social feita para desenvolvedores, programadores
              e entusiastas da tecnologia que buscam aprender, compartilhar e
              inovar. Aqui, você encontra um espaço para trocar conhecimentos
              sobre programação, explorar tendências em desenvolvimento de
              software e acompanhar as últimas inovações do mundo tech.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Conecte-se com profissionais e estudantes, participe de debates
              sobre novas tecnologias, assista a tutoriais e vídeos educativos e
              esteja sempre à frente das mudanças no universo da programação. No
              Adventus, aprender e evoluir juntos é o nosso principal objetivo.
            </p>
            <strong className="text-blue-800 font-semibold text-xl">
              Adventus – onde a inovação encontra a comunidade.
            </strong>
          </div>
          <div className="flex justify-center items-center">
            <img 
              src="/img/Hand coding.gif" 
              alt="Desenvolvedor programando" 
              className="max-w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </section>

        <section id="sobre" className="block text-center max-w-6xl mx-auto px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-12">
              Por que escolher o Adventus?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Principal;