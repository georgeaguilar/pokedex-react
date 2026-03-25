import { useEffect, useState } from "react";
import { usePokemonStore } from "../../application/store/pokemonStore";
import PokemonCard from "../components/PokemonCard";
import SearchInput from "../components/ui/SearchInput";
import MultiSelect from "../components/ui/MultiSelect";
import Pagination from "../components/ui/Pagination";
import {
  ITEMS_PER_PAGE,
  POKEMON_TYPES,
  REGIONS,
  TYPE_COLORS,
} from "../../shared/constants/pokemonDetail";
import useDebounce from "../hooks/useDebounce";

const REGION_OPTIONS = REGIONS.map(({ value, label }) => ({ value, label }))

function PokemonList() {
  const { pokemons, loading, error, fetchPokemons } = usePokemonStore();
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(["kanto"]);
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedTypes = useDebounce(selectedTypes);
  const debouncedRegions = useDebounce(selectedRegions);

  useEffect(() => {
    fetchPokemons(debouncedTypes, debouncedRegions);
  }, [debouncedTypes, debouncedRegions, fetchPokemons]);

  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const displayed = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Loading Pokémon...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="h-full flex flex-col max-w-5xl mx-auto w-full px-4 py-6">
      <div className="flex flex-col sm:flex-row gap-3 mb-6 shrink-0">
        <SearchInput
          value={search}
          onChange={(v) => {
            setSearch(v);
            setCurrentPage(1);
          }}
          placeholder="Search by name..."
        />
        <MultiSelect
          options={REGION_OPTIONS}
          selected={selectedRegions}
          onChange={(v) => {
            setSelectedRegions(v.length === 0 ? ["kanto"] : v);
            setCurrentPage(1);
          }}
          placeholder="Filter by region..."
        />
        <MultiSelect
          options={POKEMON_TYPES}
          selected={selectedTypes}
          onChange={(v) => {
            setSelectedTypes(v);
            setCurrentPage(1);
          }}
          placeholder="Filter by type..."
          colorMap={TYPE_COLORS}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex-1 flex justify-center items-center">
          <p className="text-gray-400 dark:text-gray-500 text-lg">
            No Pokémon found.
          </p>
        </div>
      ) : (
        <>
          <div className="flex-1 min-h-0 overflow-y-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {displayed.map((pokemon, index) => (
                <div
                  key={pokemon.name}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${Math.min(index * 30, 400)}ms` }}
                >
                  <PokemonCard pokemon={pokemon} />
                </div>
              ))}
            </div>
          </div>
          <div className="shrink-0">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default PokemonList;
