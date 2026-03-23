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
