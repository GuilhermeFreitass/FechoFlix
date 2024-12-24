'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { useState } from 'react'
import { CardSkeletonGrid } from '../components/CardSkeleton'
import Link from 'next/link'
import Image from 'next/image'
import { CustomPagination } from '../components/CustomPagination'

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
      params: { 
        page,
        language: 'pt-BR'
      }
    }).then(res => res.data)
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Filmes Populares</h1>
      
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
            {movies?.results.map((movie) => (
              <Link href={`/movies/${movie.id}`} key={movie.id}>
                <div className="relative aspect-[2/3] group cursor-pointer overflow-hidden rounded-lg">
                  <div className="absolute top-2 left-2 z-10 bg-black/60 px-2 py-1 rounded text-sm">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-white ml-1">{movie.vote_average.toFixed(1)}</span>
                  </div>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}${movie.poster_path}`}
                    alt={movie.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-end p-4">
                    <h3 className="text-white text-center font-semibold mb-2 drop-shadow-lg">
                      {movie.title}
                    </h3>
                    <span className="text-gray-300 text-sm drop-shadow-lg">
                      {new Date(movie.release_date).getFullYear()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {movies?.total_pages && movies.total_pages > 1 && (
            <div className="flex justify-center mt-8">
              <CustomPagination
                current={page}
                total={movies.total_pages}
                onChange={setPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
} 