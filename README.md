# FechôFlix 🎬

Um catálogo moderno de filmes e séries construído com Next.js 13, utilizando a API do TMDB (The Movie Database) para fornecer informações atualizadas sobre filmes e séries.

## 🚀 Tecnologias Utilizadas

- **Next.js 13** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **TanStack Query** - Gerenciamento de estado e cache
- **Axios** - Cliente HTTP
- **Ant Design** - Biblioteca de componentes UI
- **Tailwind CSS** - Framework CSS utilitário

## 🎯 Funcionalidades Principais

### 1. Navegação e Layout
- Navbar responsiva com menu mobile
- Sistema de busca integrado
- Layout moderno e intuitivo
- Hero Section com animações

### 2. Catálogo de Filmes e Séries
- Carrossel de filmes populares
- Grid de filmes e séries em alta
- Paginação dos resultados
- Ordenação por avaliação

### 3. Sistema de Busca
- Busca integrada por filmes e séries
- Resultados paginados
- Feedback visual durante carregamento

### 4. Experiência do Usuário
- Loading states com skeletons
- Feedback visual nas interações
- Hover effects nos cards
- Design responsivo

## 🏗️ Estrutura do Projeto

\`\`\`
├── app/
│   ├── components/         # Componentes reutilizáveis
│   │   ├── Navbar.tsx     # Navegação principal
│   │   ├── HeroSection.tsx # Seção inicial
│   │   ├── MovieCarousel.tsx # Carrossel de filmes
│   │   ├── TrendingMovies.tsx # Grid de filmes populares
│   │   ├── TrendingTVShows.tsx # Grid de séries populares
│   │   └── CardSkeleton.tsx # Loading states
│   │
│   ├── movies/            # Rotas de filmes
│   │   ├── page.tsx       # Lista de filmes
│   │   └── [id]/          # Detalhes do filme
│   │
│   ├── tv/               # Rotas de séries
│   │   ├── page.tsx      # Lista de séries
│   │   └── [id]/         # Detalhes da série
│   │
│   ├── search/           # Sistema de busca
│   │   └── page.tsx      # Resultados da busca
│   │
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Página inicial
│
├── lib/                  # Configurações e utilitários
│   ├── axios.ts         # Cliente HTTP
│   └── query.ts         # Configuração do TanStack Query
\`\`\`

## 💭 Processo de Desenvolvimento

### 1. Setup Inicial
- Configuração do Next.js com TypeScript
- Integração do Tailwind CSS e Ant Design
- Configuração do TanStack Query para gerenciamento de estado

### 2. Desenvolvimento da UI
- Criação da Navbar responsiva
- Implementação do Hero Section
- Desenvolvimento dos componentes de card e carrossel

### 3. Integração com API
- Configuração do cliente Axios
- Integração com a API do TMDB
- Implementação das queries para filmes e séries

### 4. Otimizações
- Implementação de loading states
- Otimização de imagens com next/image
- Melhorias de performance e UX

## 🔧 Configuração do Projeto

1. Clone o repositório
2. Instale as dependências:
\`\`\`bash
npm install
\`\`\`

3. Configure as variáveis de ambiente:
\`\`\`env
NEXT_PUBLIC_API_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_API_KEY=sua_chave_api_aqui
NEXT_PUBLIC_IMG_URL=https://image.tmdb.org/t/p/original
\`\`\`

4. Inicie o servidor de desenvolvimento:
\`\`\`bash
npm run dev
\`\`\`
.
