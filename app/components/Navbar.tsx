'use client'

import { Input } from 'antd'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
const { Search } = Input

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  
  const handleSearch = (value: string) => {
    if (value.trim()) {
      router.push(`/search?q=${encodeURIComponent(value.trim())}`)
    }
  }

  const isActive = (path: string) => {
    return pathname === path ? 'text-red-600' : 'text-gray-300 hover:text-red-600'
  }

  return (
    <nav className="bg-black/90 backdrop-blur-sm p-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-red-600 text-3xl font-bold">
            FechoFlix
          </Link>
          
          <div className="flex gap-6">
            <Link 
              href="/" 
              className={`${isActive('/')} transition-colors duration-200`}
            >
              Início
            </Link>
            <Link 
              href="/movies" 
              className={`${isActive('/movies')} transition-colors duration-200`}
            >
              Filmes
            </Link>
            <Link 
              href="/tv" 
              className={`${isActive('/tv')} transition-colors duration-200`}
            >
              Séries
            </Link>
          </div>
        </div>
        
        <div className="w-96">
          <Search
            placeholder="Buscar filmes e séries..."
            allowClear
            enterButton
            size="large"
            onSearch={handleSearch}
            className="searchbar"
          />
        </div>
      </div>
    </nav>
  )
} 