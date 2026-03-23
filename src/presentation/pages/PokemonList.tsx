import { useEffect, useState } from 'react'
import { usePokemonStore } from '../../application/store/pokemonStore'
import PokemonCard from '../components/PokemonCard'
import SearchInput from '../components/ui/SearchInput'
import MultiSelect from '../components/ui/MultiSelect'
import { POKEMON_TYPES, TYPE_COLORS } from '../../shared/constants/pokemonDetail'

function PokemonList() {
  const { pokemons, loading, error, fetchPokemons } = usePokemonStore()
  const [search, setSearch] = useState('')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  useEffect(() => {
    fetchPokemons(selectedTypes)
  }, [selectedTypes, fetchPokemons])

  const displayed = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <p className="text-gray-500 text-lg">Loading Pokémon...</p>
    </div>
  )

  if (error) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <p className="text-red-500 text-lg">{error}</p>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by name..."
        />
        <MultiSelect
          options={POKEMON_TYPES}
          selected={selectedTypes}
          onChange={setSelectedTypes}
          placeholder="Filter by type..."
          colorMap={TYPE_COLORS}
        />
      </div>

      {displayed.length === 0 ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <p className="text-gray-400 text-lg">No Pokémon found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {displayed.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  )
}

export default PokemonList
