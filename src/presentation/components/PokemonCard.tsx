import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import type { PokemonListItem } from '../../domain/pokemon.types'

interface Props {
  pokemon: PokemonListItem
}

function getIdFromUrl(url: string): number {
  const parts = url.split('/').filter(Boolean)
  return parseInt(parts[parts.length - 1])
}

function PokemonCard({ pokemon }: Props) {
  const navigate = useNavigate()
  const id = getIdFromUrl(pokemon.url)
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

  return (
    <div
      onClick={() => navigate(`/pokemon/${pokemon.name}`)}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col items-center p-3 sm:p-4 gap-2 border border-gray-100 dark:border-gray-700"
    >
      <span className="self-end text-xs font-semibold text-gray-400 dark:text-gray-500">
        #{String(id).padStart(3, '0')}
      </span>
      <img
        src={imageUrl}
        alt={pokemon.name}
        className="w-20 h-20 sm:w-28 sm:h-28 object-contain drop-shadow-md"
        loading="lazy"
      />
      <span className="text-gray-800 dark:text-gray-100 font-semibold capitalize tracking-wide">
        {pokemon.name}
      </span>
    </div>
  )
}

export default memo(PokemonCard)
