import { create } from 'zustand'
import type { Pokemon, PokemonListItem } from '../../domain/pokemon.types'
import { fetchPokemonList, fetchPokemonByName, fetchPokemonNamesByTypes } from '../../infrastructure/pokeapi/pokemonApi'
import { REGIONS } from '../../shared/constants/pokemonDetail'

interface PokemonStore {
  pokemons: PokemonListItem[]
  allPokemons: PokemonListItem[]
  regionCacheKey: string
  selectedPokemon: Pokemon | null
  loading: boolean
  error: string | null
  fetchPokemons: (types?: string[], regions?: string[]) => Promise<void>
  fetchPokemon: (name: string) => Promise<void>
}

export const usePokemonStore = create<PokemonStore>((set, get) => ({
  pokemons: [],
  allPokemons: [],
  regionCacheKey: '',
  selectedPokemon: null,
  loading: false,
  error: null,

  fetchPokemons: async (types: string[] = [], selectedRegions: string[] = ['kanto']) => {
    set({ loading: true, error: null })
    try {
      const regionKey = [...selectedRegions].sort().join(',')
      let allPokemons = get().regionCacheKey === regionKey ? get().allPokemons : []

      if (allPokemons.length === 0) {
        const regionDefs = selectedRegions
          .map((v) => REGIONS.find((r) => r.value === v))
          .filter(Boolean) as typeof REGIONS

        const results = await Promise.all(
          regionDefs.map((r) => fetchPokemonList(r.limit, r.offset))
        )
        const seen = new Set<string>()
        allPokemons = results
          .flat()
          .filter((p) => {
            if (seen.has(p.name)) return false
            seen.add(p.name)
            return true
          })
          .sort((a, b) => {
            const idA = parseInt(a.url.split('/').filter(Boolean).at(-1) ?? '0')
            const idB = parseInt(b.url.split('/').filter(Boolean).at(-1) ?? '0')
            return idA - idB
          })
        set({ allPokemons, regionCacheKey: regionKey })
      }

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
