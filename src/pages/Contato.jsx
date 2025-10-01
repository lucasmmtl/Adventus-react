import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Contato = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mensagem enviada com sucesso!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const contactItems = [
    {
      icon: "fas fa-envelope",
      title: "Email",
      content: (
        <a
          href="mailto:contato@adventus.dev"
          className="text-blue-800 hover:underline"
        >
          contato@adventus.dev
        </a>
      ),
    },
    {
      icon: "fas fa-phone",
      title: "Telefone",
      content: (
        <a href="tel:+551140002025" className="text-blue-800 hover:underline">
          +55 (11) 4000-2025
        </a>
      ),
    },
    {
      icon: "fas fa-map-marker-alt",
      title: "Endereço",
      content: (
        <>
          Rua do Código, 1010 – Sala 404
          <br />
          Bairro Tech Valley – São Paulo/SP
        </>
      ),
    },
    {
      icon: "fas fa-clock",
      title: "Horário de Atendimento",
      content: (
        <>
          Segunda a Sexta: 9h às 18h
          <br />
          Sábado: 9h às 14h
        </>
      ),
    },
    {
      icon: "fas fa-globe",
      title: "Redes Sociais",
      content: (
        <div className="flex gap-4 mt-2 justify-center">
          <a
            href="https://instagram.com/adventus.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 bg-blue-800 text-white rounded-md hover:-translate-y-0.5 transition-all duration-200"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://twitter.com/adventus_dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 bg-blue-800 text-white rounded-md hover:-translate-y-0.5 transition-all duration-200"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://github.com/adventus"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 bg-blue-800 text-white rounded-md hover:-translate-y-0.5 transition-all duration-200"
            aria-label="GitHub"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>
      ),
    },
  ];

  return (
    <div className="font-inter text-slate-800 bg-slate-100">
      <Navbar />

      <main>
        <div className="max-w-6xl mx-auto px-8 py-32 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 mb-4">
            Entre em Contato
          </h1>
          <p className="text-lg text-slate-600 mb-12">
            Tem alguma dúvida, sugestão ou precisa de ajuda? Estamos aqui para
            você!
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
            <Card className="text-left">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
                Envie uma mensagem
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <Input
                  label="Nome completo"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Digite seu nome completo"
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

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-800">
                    Assunto
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="px-4 py-3 border-2 border-slate-200 rounded-lg text-base transition-all duration-200 bg-white focus:outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-800/10"
                    required
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="suporte">Suporte Técnico</option>
                    <option value="sugestao">Sugestão</option>
                    <option value="parceria">Parceria</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-800">
                    Mensagem
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Digite sua mensagem"
                    className="px-4 py-3 border-2 border-slate-200 rounded-lg text-base transition-all duration-200 bg-white focus:outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-800/10 resize-vertical min-h-[120px]"
                    required
                  />
                </div>

                <Button type="submit">Enviar Mensagem</Button>
              </form>
            </Card>

            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">
                Informações de Contato
              </h2>

              {contactItems.map((item, index) => (
                <Card key={index} hover className="text-center">
                  <i className={`${item.icon} text-2xl text-blue-800 mb-1`}></i>
                  <h3 className="text-ms font-semibold text-slate-800 mb-2">
                    {item.title}
                  </h3>
                  <div className="text-slate-600 text-sm">{item.content}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contato;
