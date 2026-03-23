# Pokedex React

A Pokédex web app built with React to browse the first 151 Pokémon, view their details, and filter them by name or type.

## Features

- List of the first 151 Pokémon with official artwork
- Real-time search by name
- Multi-type filter with type-based color tags
- Detail view with base stats, types, height and weight
- Layered architecture: domain, application, infrastructure, and presentation

## Tech Stack

- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Zustand](https://zustand-demo.pmnd.rs) — global state management
- [React Router v7](https://reactrouter.com)
- [PokéAPI](https://pokeapi.co) — data source

## Requirements

- Node.js 23+
- npm

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

App runs at `http://localhost:5173`.

## Project Structure

```
src/
├── domain/               # Types and interfaces
├── application/
│   └── store/            # Zustand store
├── infrastructure/
│   └── pokeapi/          # PokéAPI calls
├── presentation/
│   ├── components/
│   │   └── ui/           # Reusable components (SearchInput, MultiSelect)
│   └── pages/            # PokemonList, PokemonDetail
└── shared/
    └── constants/        # Type colors, stat labels
```
