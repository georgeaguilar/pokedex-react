import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-red-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white border-4 border-gray-800 flex items-center justify-center shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-800" />
        </div>
        <Link to="/" className="text-white text-2xl font-bold tracking-widest uppercase">
          Pokédex
        </Link>
      </div>
    </header>
  )
}

export default Header
