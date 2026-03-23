import type { Pokemon, PokemonListItem } from '../../domain/pokemon.types'

const BASE_URL = 'https://pokeapi.co/api/v2'

export async function fetchPokemonList(limit = 151): Promise<PokemonListItem[]> {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}`)
  const data = await res.json()
  return data.results
}

export async function fetchPokemonByName(name: string): Promise<Pokemon> {
  const res = await fetch(`${BASE_URL}/pokemon/${name}`)
  return res.json()
}

export async function fetchPokemonNamesByTypes(types: string[]): Promise<Set<string>> {
  const results = await Promise.all(
    types.map(async (type) => {
      const res = await fetch(`${BASE_URL}/type/${type}`)
      const data = await res.json()
      return data.pokemon.map((p: { pokemon: { name: string } }) => p.pokemon.name) as string[]
    })
  )
  return new Set(results.flat())
}
