# Dashboard Generator Prompt

## Contexto
Você está gerando um dashboard enterprise para um projeto Kilo Code.

## Requisitos
- **Design System**: #007BFF (primária), #FFA500 (accent)
- **Layout**: Sidebar, Header, KPI cards, filtros, tabela, gráficos
- **Estados**: loading, empty, error
- **Responsivo**: Mobile-first
- **Tema**: Dark/Light switch
- **Acessibilidade**: WCAG AA

## Componentes
1. **Sidebar**: Navegação, logo, user menu
2. **Header**: Título, ações globais, notificações
3. **KPI Cards**: 4 cards principais (métricas)
4. **Filtros**: Date range, categorias, busca
5. **Tabela**: Paginação, sorting, seleção
6. **Gráficos**: Line chart, Bar chart, Pie chart

## Tecnologias
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui (opcional)
- Recharts ou Chart.js

## Entrega
- Estrutura de pastas
- Componentes principais
- Tipagem TypeScript
- Estilos Tailwind
- Exemplo de dados mockados