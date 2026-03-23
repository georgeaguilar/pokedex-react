import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './presentation/components/Header'
import PokemonList from './presentation/pages/PokemonList'
import PokemonDetail from './presentation/pages/PokemonDetail'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
