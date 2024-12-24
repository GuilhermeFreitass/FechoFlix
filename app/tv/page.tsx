'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { useState } from 'react'
import { CardSkeletonGrid } from '../components/CardSkeleton'
import Link from 'next/link'
import Image from 'next/image'
import { CustomPagination } from '../components/CustomPagination'

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
        <>
          <CardSkeletonGrid count={20} />
          <div className="flex justify-center mt-8">
            <CustomPagination
              current={1}
              total={10}
              onChange={() => {}}
              disabled
            />
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {shows?.results.map((show) => (
              <Link href={`/tv/${show.id}`} key={show.id}>
                <div className="relative aspect-[2/3] group cursor-pointer overflow-hidden rounded-lg">
                  <div className="absolute top-2 left-2 z-10 bg-black/60 px-2 py-1 rounded text-sm">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-white ml-1">{show.vote_average.toFixed(1)}</span>
                  </div>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}${show.poster_path}`}
                    alt={show.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-end p-4">
                    <h3 className="text-white text-center font-semibold mb-2 drop-shadow-lg">
                      {show.name}
                    </h3>
                    <span className="text-gray-300 text-sm drop-shadow-lg">
                      {new Date(show.first_air_date).getFullYear()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {shows?.total_pages && shows.total_pages > 1 && (
            <div className="flex justify-center mt-8">
              <CustomPagination
                current={page}
                total={shows.total_pages}
                onChange={setPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
} 