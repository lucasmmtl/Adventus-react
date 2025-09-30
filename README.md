# Adventus React - Rede Social para Desenvolvedores

Versão React do projeto Adventus com TailwindCSS.

## 🚀 Como executar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Copiar imagens:**
   Copie as imagens da pasta `img/` original para `public/img/`:
   - Adventus.png
   - Adventus-Logo.png
   - Hand coding.gif
   - usuario.png

3. **Executar em desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Build para produção:**
   ```bash
   npm run build
   ```

## 📁 Estrutura dos Componentes

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.jsx       # Botão reutilizável
│   │   ├── Input.jsx        # Input com label e validação
│   │   ├── Card.jsx         # Card base para conteúdo
│   │   └── FeatureCard.jsx  # Card específico para features
│   └── layout/
│       ├── Navbar.jsx       # Navegação principal
│       └── Footer.jsx       # Rodapé
├── pages/
│   ├── Login.jsx           # Página de login
│   ├── Cadastro.jsx        # Página de cadastro
│   ├── Principal.jsx       # Página principal
│   ├── FAQ.jsx             # Página de perguntas frequentes
│   └── Contato.jsx         # Página de contato
├── App.jsx                 # Componente principal com rotas
├── main.jsx               # Entry point
└── index.css              # Estilos globais com TailwindCSS
```

## 🎨 Componentes Reutilizáveis

### Button
```jsx
<Button variant="primary" size="md" onClick={handleClick}>
  Texto do botão
</Button>
```

### Input
```jsx
<Input 
  label="Email" 
  type="email" 
  placeholder="Digite seu email"
  value={email}
  onChange={handleChange}
/>
```

### Card
```jsx
<Card hover className="custom-class">
  Conteúdo do card
</Card>
```

### FeatureCard
```jsx
<FeatureCard 
  icon="🚀"
  title="Título"
  description="Descrição da feature"
/>
```

## 🛠️ Tecnologias

- **React 18** com Hooks
- **React Router DOM** para navegação
- **TailwindCSS** para estilização
- **Vite** como bundler
- **Font Awesome** para ícones
- **Google Fonts (Inter)** para tipografia

## 📱 Responsividade

Todos os componentes são totalmente responsivos usando as classes utilitárias do TailwindCSS:
- Mobile-first design
- Breakpoints: sm, md, lg, xl
- Grid e Flexbox responsivos

## 🎯 Funcionalidades

- ✅ Sistema de login e cadastro com validação
- ✅ Navegação com dropdown de usuário
- ✅ Páginas responsivas
- ✅ Componentes reutilizáveis
- ✅ Formulários com validação
- ✅ Design system consistente
- ✅ Animações e transições suaves