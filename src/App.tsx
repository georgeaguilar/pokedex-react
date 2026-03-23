import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './presentation/components/Header'
import PokemonList from './presentation/pages/PokemonList'
import PokemonDetail from './presentation/pages/PokemonDetail'
import useDarkMode from './presentation/hooks/useDarkMode'

function App() {
  const { isDark, toggle } = useDarkMode()

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header isDark={isDark} onToggleDark={toggle} />
        <main>
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/pokemon/:name" element={<PokemonDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
