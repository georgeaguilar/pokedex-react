import { useEffect } from 'react'
import { usePokemonStore } from '../../application/store/pokemonStore'
import PokemonCard from '../components/PokemonCard'

function PokemonList() {
  const { pokemons, loading, error, fetchPokemons } = usePokemonStore()

  useEffect(() => {
    fetchPokemons()
  }, [fetchPokemons])

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <p className="text-gray-500 text-lg">Cargando pokémon...</p>
    </div>
  )

  if (error) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <p className="text-red-500 text-lg">{error}</p>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  )
}

export default PokemonList
