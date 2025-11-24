import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Card from '../components/ui/Card';

const FAQ = () => {
  const faqs = [
    {
      question: "1. O que é o Adventus?",
      answer: "O Adventus é uma rede social feita especialmente para desenvolvedores, programadores e apaixonados por tecnologia. Nosso objetivo é criar um espaço onde você possa aprender, compartilhar experiências e acompanhar as últimas novidades do mundo da programação."
    },
    {
      question: "2. Quem pode usar o Adventus?",
      answer: "Qualquer pessoa interessada em tecnologia! Seja estudante, iniciante, profissional experiente ou apenas curioso, o Adventus é para todos que desejam trocar conhecimento e crescer junto da comunidade."
    },
    {
      question: "3. O Adventus é gratuito?",
      answer: "Sim! O acesso ao Adventus é totalmente gratuito. Algumas funcionalidades extras (como cursos avançados e conteúdos exclusivos) podem ser disponibilizadas futuramente em planos premium."
    },
    {
      question: "4. Como faço para criar uma conta?",
      answer: "É simples: clique em \"Cadastre-se\" na página inicial, preencha seus dados básicos e pronto! Em poucos segundos você já poderá explorar tudo que o Adventus oferece."
    },
    {
      question: "5. Que tipo de conteúdo posso encontrar no Adventus?",
      answer: "Você encontrará:",
      list: [
        "Fóruns e debates sobre linguagens de programação",
        "Tutoriais e vídeos educativos",
        "Artigos sobre tendências em tecnologia",
        "Espaços para networking com outros devs",
        "Dicas de carreira e mercado de trabalho em TI"
      ]
    },
    {
      question: "6. Posso postar meu próprio conteúdo?",
      answer: "Sim! Todo usuário pode criar publicações, compartilhar artigos, projetos e até tutoriais. Queremos que você ensine tanto quanto aprende."
    },
    {
      question: "7. O Adventus é apenas para programadores?",
      answer: "Não! Designers, engenheiros, analistas, estudantes de TI e até curiosos pelo mundo tech são bem-vindos. A ideia é reunir diferentes perspectivas da área de tecnologia."
    },
    {
      question: "8. O Adventus funciona em dispositivos móveis?",
      answer: "Sim. O site é responsivo e pode ser acessado pelo navegador do seu celular. Em breve também lançaremos aplicativos dedicados para Android e iOS."
    },
    {
      question: "9. Como posso encontrar pessoas com os mesmos interesses que eu?",
      answer: "Você pode seguir outros usuários, entrar em comunidades temáticas (ex.: JavaScript, Python, Inteligência Artificial) e participar de grupos de discussão."
    },
    {
      question: "10. O Adventus tem suporte técnico?",
      answer: (
        <>
          Sim. Se tiver problemas ou dúvidas, acesse a aba "Ajuda e Suporte" dentro da plataforma ou envie um e-mail para{' '}
          <a href="mailto:suporte@adventus.dev" className="text-blue-800 font-medium hover:underline">
            suporte@adventus.dev
          </a>
          . Nossa equipe estará pronta para ajudar.
        </>
      )
    }
  ];

  return (
    <div className="font-inter text-slate-800 bg-slate-100 min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-8 py-32 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 mb-4">
            Perguntas Frequentes
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Encontre respostas para as dúvidas mais comuns sobre o Adventus
          </p>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {faqs.map((faq, index) => (
              <Card key={index} hover className="text-left border-l-4 border-l-blue-800">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  {faq.question}
                </h2>
                <div className="text-slate-600 leading-relaxed">
                  {typeof faq.answer === 'string' ? (
                    <p>{faq.answer}</p>
                  ) : (
                    <p>{faq.answer}</p>
                  )}
                  {faq.list && (
                    <ul className="mt-4 pl-6 space-y-2">
                      {faq.list.map((item, i) => (
                        <li key={i} className="list-disc">{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </Card>
            ))}
          </section>

          <div className="text-center mt-12">
            <strong className="text-blue-800 font-semibold text-xl">
              Adventus – onde a inovação encontra a comunidade.
            </strong>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;