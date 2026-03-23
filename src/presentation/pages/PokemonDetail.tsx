import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePokemonStore } from '../../application/store/pokemonStore'

function PokemonDetail() {
  const { name } = useParams<{ name: string }>()
  const { selectedPokemon, loading, error, fetchPokemon } = usePokemonStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (name) fetchPokemon(name)
  }, [name, fetchPokemon])

  if (loading) return <div>Cargando...</div>
  if (error) return <div>{error}</div>
  if (!selectedPokemon) return null

  return (
    <div>
      <button onClick={() => navigate('/')}>Volver</button>
      <h1>{selectedPokemon.name}</h1>
      <img
        src={selectedPokemon.sprites.other['official-artwork'].front_default}
        alt={selectedPokemon.name}
      />
      <p>Altura: {selectedPokemon.height}</p>
      <p>Peso: {selectedPokemon.weight}</p>
      <p>Tipos: {selectedPokemon.types.map((t) => t.type.name).join(', ')}</p>
    </div>
  )
}

export default PokemonDetail
