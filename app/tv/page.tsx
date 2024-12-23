'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { Pagination, Spin } from 'antd'
import { useState } from 'react'
import Link from 'next/link'

interface TVShow {
  id: number
  name: string
  poster_path: string
  overview: string
  vote_average: number
  first_air_date: string
}

export default function TVShows() {
  const [page, setPage] = useState(1)
  
  const { data: shows, isLoading } = useQuery<{ 
    results: TVShow[]
    total_pages: number 
  }>({
    queryKey: ['tv-shows', page],
    queryFn: async () => {
      const response = await api.get('/tv/popular', {
        params: {
          page,
          language: 'pt-BR',
        }
      })
      return response.data
    }
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Séries Populares</h1>
      
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {shows?.results.map((show) => (
              <Link href={`/tv/${show.id}`} key={show.id}>
                <div className="relative group cursor-pointer">
                  <div className="absolute top-2 left-2 z-10 bg-black/60 px-2 py-1 rounded text-sm">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-white ml-1">{show.vote_average.toFixed(1)}</span>
                  </div>
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}${show.poster_path}`}
                    alt={show.name}
                    className="w-full rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col items-center justify-center p-4">
                    <h3 className="text-white text-center font-semibold mb-2">
                      {show.name}
                    </h3>
                    <span className="text-gray-300 text-sm">
                      {new Date(show.first_air_date).getFullYear()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {shows?.total_pages && shows.total_pages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                current={page}
                total={shows.total_pages * 10}
                onChange={setPage}
                className="[&_.ant-pagination-item-active]:!bg-red-600 [&_.ant-pagination-item-active_a]:!text-white"
              />
            </div>
          )}
        </>
      )}
    </div>
  )
} 