export const ITEMS_PER_PAGE = 10

export interface Region {
  value: string
  label: string
  offset: number
  limit: number
}

export const REGIONS: Region[] = [
  { value: 'kanto',  label: 'Kanto  — Gen I',   offset: 0,    limit: 151 },
  { value: 'johto',  label: 'Johto  — Gen II',  offset: 151,  limit: 100 },
  { value: 'hoenn',  label: 'Hoenn  — Gen III', offset: 251,  limit: 135 },
  { value: 'sinnoh', label: 'Sinnoh — Gen IV',  offset: 386,  limit: 107 },
  { value: 'unova',  label: 'Unova  — Gen V',   offset: 493,  limit: 156 },
  { value: 'kalos',  label: 'Kalos  — Gen VI',  offset: 649,  limit: 72  },
  { value: 'alola',  label: 'Alola  — Gen VII', offset: 721,  limit: 88  },
  { value: 'galar',  label: 'Galar  — Gen VIII',offset: 809,  limit: 96  },
  { value: 'paldea', label: 'Paldea — Gen IX',  offset: 905,  limit: 120 },
]

export const POKEMON_TYPES = [
  'normal', 'fire', 'water', 'grass', 'electric', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy',
].map((type) => ({ value: type, label: type.charAt(0).toUpperCase() + type.slice(1) }))

export const TYPE_COLORS: Record<string, string> = {
  fire:             'bg-orange-400 text-white',
  water:            'bg-blue-400 text-white',
  grass:            'bg-green-400 text-white',
  electric:         'bg-yellow-300 text-gray-800',
  psychic:          'bg-pink-400 text-white',
  ice:              'bg-cyan-300 text-gray-800',
  dragon:           'bg-indigo-500 text-white',
  dark:             'bg-gray-700 text-white',
  fairy:            'bg-pink-300 text-gray-800',
  normal:           'bg-gray-300 text-gray-800',
  fighting:         'bg-orange-600 text-white',
  flying:           'bg-sky-300 text-gray-800',
  poison:           'bg-purple-400 text-white',
  ground:           'bg-yellow-500 text-white',
  rock:             'bg-yellow-700 text-white',
  bug:              'bg-lime-400 text-gray-800',
  ghost:            'bg-purple-600 text-white',
  steel:            'bg-slate-400 text-white',
}

export const STAT_COLORS: Record<string, string> = {
  hp:               'bg-red-400',
  attack:           'bg-orange-400',
  defense:          'bg-yellow-400',
  'special-attack': 'bg-blue-400',
  'special-defense':'bg-green-400',
  speed:            'bg-pink-400',
}

export const STAT_LABELS: Record<string, string> = {
  hp:               'HP',
  attack:           'ATK',
  defense:          'DEF',
  'special-attack': 'SpA',
  'special-defense':'SpD',
  speed:            'SPD',
}
