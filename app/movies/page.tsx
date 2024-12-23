'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { Pagination } from 'antd'
import { useState } from 'react'
import { CardSkeletonGrid } from '../components/CardSkeleton'
import Link from 'next/link'
import Image from 'next/image'

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
            <Pagination
              total={10}
              disabled
              className="[&_.ant-pagination-item-active]:!bg-red-600 [&_.ant-pagination-item-active_a]:!text-white opacity-50"
            />
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies?.results.map((movie) => (
              <Link href={`/movies/${movie.id}`} key={movie.id}>
                <div className="relative group cursor-pointer">
                  <div className="absolute top-2 left-2 z-10 bg-black/60 px-2 py-1 rounded text-sm">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-white ml-1">{movie.vote_average.toFixed(1)}</span>
                  </div>
                  <Image unoptimized
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}${movie.poster_path}`}
                    alt={movie.title}
                    width={300}
                    height={450}
                    className="w-full rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col items-center justify-center p-4">
                    <h3 className="text-white text-center font-semibold mb-2">
                      {movie.title}
                    </h3>
                    <span className="text-gray-300 text-sm">
                      {new Date(movie.release_date).getFullYear()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {movies?.total_pages && movies.total_pages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                current={page}
                total={movies.total_pages * 10}
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