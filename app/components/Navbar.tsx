'use client'

import { Input } from 'antd'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { MenuOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons'

const { Search } = Input

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  
  const handleSearch = (value: string) => {
    if (value.trim()) {
      router.push(`/search?q=${encodeURIComponent(value.trim())}`)
      setIsSearchOpen(false)
    }
  }

  const isActive = (path: string) => {
    return pathname === path ? 'text-red-600' : 'text-gray-300 hover:text-red-600'
  }

  return (
    <nav className="bg-black/90 backdrop-blur-sm p-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-red-600 text-2xl md:text-3xl font-bold">
          FechôFlix
        </Link>

        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="text-white text-xl"
          >
            <SearchOutlined />
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white text-xl"
          >
            {isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
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
          
          <div className="w-72">
            <Search
              placeholder="Buscar filmes e séries..."
              allowClear
              enterButton
              size="large"
              onSearch={handleSearch}
              className="searchbar [&_.ant-input-group]:!border-red-600 [&_.ant-input]:!border-red-600 [&_.ant-btn-primary]:!bg-red-600 [&_.ant-btn-primary]:!border-red-600 hover:[&_.ant-btn-primary]:!bg-red-700 hover:[&_.ant-btn-primary]:!border-red-700"
            />
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden pt-4">
          <div className="flex flex-col gap-4">
            <Link 
              href="/" 
              className={`${isActive('/')} transition-colors duration-200`}
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link 
              href="/movies" 
              className={`${isActive('/movies')} transition-colors duration-200`}
              onClick={() => setIsMenuOpen(false)}
            >
              Filmes
            </Link>
            <Link 
              href="/tv" 
              className={`${isActive('/tv')} transition-colors duration-200`}
              onClick={() => setIsMenuOpen(false)}
            >
              Séries
            </Link>
          </div>
        </div>
      )}

      {isSearchOpen && (
        <div className="md:hidden pt-4">
          <Search
            placeholder="Buscar filmes e séries..."
            allowClear
            enterButton
            size="large"
            onSearch={handleSearch}
            className="searchbar [&_.ant-input-group]:!border-black [&_.ant-input]:!border-black [&_.ant-btn-primary]:!bg-red-600 [&_.ant-btn-primary]:!border-black hover:[&_.ant-btn-primary]:!bg-red-700 hover:[&_.ant-btn-primary]:!border-black"
          />
        </div>
      )}
    </nav>
  )
} 