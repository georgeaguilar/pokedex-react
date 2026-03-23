import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePokemonStore } from '../../application/store/pokemonStore'

function PokemonList() {
  const { pokemons, loading, error, fetchPokemons } = usePokemonStore()
  const navigate = useNavigate()

  useEffect(() => {
    fetchPokemons()
  }, [fetchPokemons])

  if (loading) return <div>Cargando...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      {pokemons.map((pokemon) => (
        <div key={pokemon.name} onClick={() => navigate(`/pokemon/${pokemon.name}`)}>
          {pokemon.name}
        </div>
      ))}
    </div>
  )
}

export default PokemonList
