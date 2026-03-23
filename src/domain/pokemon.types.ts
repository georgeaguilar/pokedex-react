export interface PokemonListItem {
  name: string
  url: string
}

export interface PokemonStat {
  base_stat: number
  stat: { name: string }
}

export interface PokemonType {
  type: { name: string }
}

export interface PokemonSprites {
  front_default: string
  other: {
    'official-artwork': {
      front_default: string
    }
  }
}

export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  types: PokemonType[]
  stats: PokemonStat[]
  sprites: PokemonSprites
}
