'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { Card, Pagination } from 'antd'
import { useState } from 'react'

interface Movie {
  id: number
  title: string
  poster_path: string
  overview: string
  release_date: string
  vote_average: number
}

export default function Movies() {
  const [page, setPage] = useState(1)
  
  const { data: movies, isLoading } = useQuery<{ 
    results: Movie[]
    total_pages: number 
  }>({
    queryKey: ['movies', page],
    queryFn: () => api.get('/movie/popular', {
      params: { page }
    }).then(res => res.data)
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Filmes Populares</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies?.results.map((movie) => (
          <div key={movie.id} className="relative group cursor-pointer">
            <img
              src={`${process.env.NEXT_PUBLIC_IMG_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col items-center justify-center p-4">
              <h3 className="text-white text-center font-semibold mb-2">
                {movie.title}
              </h3>
              <span className="text-yellow-400 text-sm">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-gray-300 text-sm">
                {new Date(movie.release_date).getFullYear()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Pagination
          current={page}
          total={movies?.total_pages ? movies.total_pages * 10 : 0}
          onChange={setPage}
          className="[&_.ant-pagination-item-active]:!bg-red-600 [&_.ant-pagination-item-active_a]:!text-white"
        />
      </div>
    </div>
  )
} 