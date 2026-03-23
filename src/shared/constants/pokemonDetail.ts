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
