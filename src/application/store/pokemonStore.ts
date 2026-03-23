import { create } from 'zustand'
import type { Pokemon, PokemonListItem } from '../../domain/pokemon.types'
import { fetchPokemonList, fetchPokemonByName } from '../../infrastructure/pokeapi/pokemonApi'

interface PokemonStore {
  pokemons: PokemonListItem[]
  selectedPokemon: Pokemon | null
  loading: boolean
  error: string | null
  fetchPokemons: () => Promise<void>
  fetchPokemon: (name: string) => Promise<void>
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  pokemons: [],
  selectedPokemon: null,
  loading: false,
  error: null,

  fetchPokemons: async () => {
    set({ loading: true, error: null })
    try {
      const pokemons = await fetchPokemonList()
      set({ pokemons, loading: false })
    } catch {
      set({ error: 'Error al cargar los pokémon', loading: false })
    }
  },

  fetchPokemon: async (name: string) => {
    set({ loading: true, error: null, selectedPokemon: null })
    try {
      const selectedPokemon = await fetchPokemonByName(name)
      set({ selectedPokemon, loading: false })
    } catch {
      set({ error: 'Error al cargar el pokémon', loading: false })
    }
  },
}))
