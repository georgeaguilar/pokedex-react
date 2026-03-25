import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './presentation/components/Header'
import PageLoader from './presentation/components/ui/PageLoader'
import useDarkMode from './presentation/hooks/useDarkMode'

const PokemonList = lazy(() => import('./presentation/pages/PokemonList'))
const PokemonDetail = lazy(() => import('./presentation/pages/PokemonDetail'))

function App() {
  const { isDark, toggle } = useDarkMode()

  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header isDark={isDark} onToggleDark={toggle} />
        <main className="flex-1 min-h-0 overflow-y-auto">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<PokemonList />} />
              <Route path="/pokemon/:name" element={<PokemonDetail />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
