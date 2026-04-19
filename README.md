# ⚡ VelocityType

> **Teste sua velocidade de digitação. Domine seu teclado. Se divirta.**

Um app moderno e rápido para testar sua velocidade de digitação. Construído com Next.js, React e TypeScript.

---

## ✨ Funcionalidades

- **🎯 Múltiplos Modos de Teste**
  - Desafios por tempo (15s, 30s, 60s, 120s)
  - Testes por número de palavras
  - Rastreamento em tempo real de WPM e acurácia

- **🎨 Interface Bonita**
  - Tema escuro/claro
  - Animações suaves com Framer Motion
  - Design responsivo
  - Visualização de heatmap do teclado

- **🌍 Suporte Multi-idioma**
  - Português, Inglês e mais
  - Troca de idioma instantânea
  - i18n integrado

- **📊 Estatísticas em Tempo Real**
  - WPM ao vivo (Palavras Por Minuto)
  - Percentual de acurácia
  - Resultados detalhados
  - Compartilhe seus resultados

- **🎮 Efeitos Visuais**
  - Efeito ripple ao pressionar teclas
  - Sons (opcional)
  - Confete ao terminar
  - Gerenciamento automático de foco

- **📱 Funciona em Mobile**
  - Interface responsiva
  - Layout otimizado
  - Funciona em qualquer aparelho

---

## 🚀 Como Começar

### Pré-requisitos
- Node.js 18+ 
- pnpm (ou npm/yarn)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/yourusername/velocity-type.git
cd velocity-type

# Instale as dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) e comece a digitar!

---

## 📦 Tecnologias Usadas

- **Framework:** [Next.js 15](https://nextjs.org/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes:** [Shadcn/ui](https://ui.shadcn.com/)
- **Animações:** [Framer Motion](https://www.framer.com/motion/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Database:** [Supabase](https://supabase.com/)
- **Notificações:** [Sonner](https://sonner.emilkowal.ski/)

---

## 📁 Estrutura do Projeto

```
velocity-type/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/
│   ├── signup/
│   └── leaderboard/
├── components/
│   ├── typing/
│   │   ├── typing-test.tsx
│   │   ├── typing-area.tsx
│   │   ├── results.tsx
│   │   └── ...
│   ├── ui/
│   └── locale-provider.tsx
├── hooks/
├── lib/
│   ├── typing-store.ts
│   ├── i18n.ts
│   └── word-lists.ts
└── public/
```

---

## 🎮 Como Funciona

1. **Inicie o teste** - Clique na área de digitação ou pressione qualquer tecla
2. **Digite as palavras** - Siga as palavras na tela
3. **Acompanhe o progresso** - Veja seu WPM e acurácia em tempo real
4. **Termine o teste** - Termine todas as palavras ou o tempo acaba
5. **Compartilhe** - Mostre seus resultados para os amigos

### Métricas

- **WPM** - Palavras por minuto
- **Acurácia** - Percentual de acertos
- **Tempo Total** - Tempo gasto no teste

---

## 🔧 Desenvolvimento

### Scripts Disponíveis

```bash
# Servidor de desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Inicie o servidor de produção
pnpm start

# Execute o linter
pnpm lint
```

### Variáveis de Ambiente

Crie `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave
```

---

## 🎨 Personalização

### Tema

Edite `globals.css` para mudar cores, fontes e animações.

### Listas de Palavras

Modifique `lib/word-lists.ts` para adicionar novas palavras e dificuldades.

### Duração dos Testes

Atualize `components/typing/mode-selector.tsx` para mudar os tempos disponíveis.

---

## 📈 Performance

- ⚡ Otimizado com Next.js Image
- 🎯 Animações em 60fps
- 📦 ~100KB gzipped
- 🔄 SSR + ISR

---

## 🤝 Quer Contribuir?

Mande um Pull Request! Toda ajuda é bem-vinda.

1. Faça um fork
2. Crie uma branch para sua feature (`git checkout -b feature/sua-feature`)
3. Commit (`git commit -m 'Add feature'`)
4. Push (`git push origin feature/sua-feature`)
5. Abra um Pull Request

---

## 📄 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 🙏 Créditos

- [Shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Next.js](https://nextjs.org/)

---

## 🐛 Encontrou um Bug?

Abra uma [issue no GitHub](https://github.com/yourusername/velocity-type/issues)

---

<div align="center">

**Feito com ❤️**

[⭐ Star](https://github.com/yourusername/velocity-type) | [🐛 Bug](https://github.com/yourusername/velocity-type/issues) | [💡 Sugestão](https://github.com/yourusername/velocity-type/discussions)

</div>
