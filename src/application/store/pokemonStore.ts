import { create } from 'zustand'
import type { Pokemon, PokemonListItem } from '../../domain/pokemon.types'
import { fetchPokemonList, fetchPokemonByName, fetchPokemonNamesByTypes } from '../../infrastructure/pokeapi/pokemonApi'

interface PokemonStore {
  pokemons: PokemonListItem[]
  selectedPokemon: Pokemon | null
  loading: boolean
  error: string | null
  fetchPokemons: (types?: string[]) => Promise<void>
  fetchPokemon: (name: string) => Promise<void>
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  pokemons: [],
  selectedPokemon: null,
  loading: false,
  error: null,

  fetchPokemons: async (types: string[] = []) => {
    set({ loading: true, error: null })
    try {
      const allPokemons = await fetchPokemonList()
      if (types.length === 0) {
        set({ pokemons: allPokemons, loading: false })
        return
      }
      const namesByType = await fetchPokemonNamesByTypes(types)
      const filtered = allPokemons.filter((p) => namesByType.has(p.name))
      set({ pokemons: filtered, loading: false })
    } catch {
      set({ error: 'Failed to load Pokémon', loading: false })
    }
  },

  fetchPokemon: async (name: string) => {
    set({ loading: true, error: null, selectedPokemon: null })
    try {
      const selectedPokemon = await fetchPokemonByName(name)
      set({ selectedPokemon, loading: false })
    } catch {
      set({ error: 'Failed to load Pokémon', loading: false })
    }
  },
}))
