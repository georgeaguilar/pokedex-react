import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePokemonStore } from '../../application/store/pokemonStore'
import { TYPE_COLORS, STAT_COLORS, STAT_LABELS } from '../../shared/constants/pokemonDetail'

function PokemonDetail() {
  const { name } = useParams<{ name: string }>()
  const { selectedPokemon, loading, error, fetchPokemon } = usePokemonStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (name) fetchPokemon(name)
  }, [name, fetchPokemon])

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

  if (!selectedPokemon) return null

  const { id, name: pokeName, height, weight, types, stats, sprites } = selectedPokemon

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors mb-6 cursor-pointer"
      >
        ← Volver
      </button>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Hero */}
        <div className="bg-gray-50 flex flex-col items-center pt-8 pb-4 gap-2">
          <span className="text-sm font-semibold text-gray-400">
            #{String(id).padStart(3, '0')}
          </span>
          <img
            src={sprites.other['official-artwork'].front_default}
            alt={pokeName}
            className="w-48 h-48 object-contain drop-shadow-xl"
          />
          <h1 className="text-3xl font-bold capitalize text-gray-800 tracking-wide mt-2">
            {pokeName}
          </h1>
          <div className="flex gap-2 mt-1">
            {types.map(({ type }) => (
              <span
                key={type.name}
                className={`px-4 py-1 rounded-full text-sm font-semibold capitalize ${TYPE_COLORS[type.name] ?? 'bg-gray-200 text-gray-700'}`}
              >
                {type.name}
              </span>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="px-8 py-6 flex flex-col gap-6">
          {/* Height & Weight */}
          <div className="grid grid-cols-2 divide-x divide-gray-100">
            <div className="flex flex-col items-center gap-1 pr-4">
              <span className="text-xs text-gray-400 uppercase tracking-wider">Altura</span>
              <span className="text-xl font-semibold text-gray-700">{(height / 10).toFixed(1)} m</span>
            </div>
            <div className="flex flex-col items-center gap-1 pl-4">
              <span className="text-xs text-gray-400 uppercase tracking-wider">Peso</span>
              <span className="text-xl font-semibold text-gray-700">{(weight / 10).toFixed(1)} kg</span>
            </div>
          </div>

          {/* Stats */}
          <div>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Estadísticas base
            </h2>
            <div className="flex flex-col gap-3">
              {stats.map(({ stat, base_stat }) => (
                <div key={stat.name} className="flex items-center gap-3">
                  <span className="w-10 text-xs font-bold text-gray-400 uppercase text-right shrink-0">
                    {STAT_LABELS[stat.name] ?? stat.name}
                  </span>
                  <span className="w-8 text-sm font-semibold text-gray-700 text-right shrink-0">
                    {base_stat}
                  </span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${STAT_COLORS[stat.name] ?? 'bg-gray-400'}`}
                      style={{ width: `${Math.min((base_stat / 255) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetail
