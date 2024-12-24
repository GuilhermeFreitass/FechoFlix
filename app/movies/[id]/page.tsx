'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { Spin } from 'antd'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { use } from 'react'
import { RatingForm } from '@/app/components/RatingForm'

interface MovieDetails {
  id: number
  title: string
  overview: string
  release_date: string
  vote_average: number
  backdrop_path: string
  poster_path: string
  runtime: number
  genres: Array<{ id: number; name: string }>
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default function MovieDetails({ params }: PageProps) {
  const { id } = use(params)
  
  const { data: movie, isLoading } = useQuery<MovieDetails>({
    queryKey: ['movie', id],
    queryFn: async () => {
      const response = await api.get(`/movie/${id}`, {
        params: {
          language: 'pt-BR',
        }
      })
      return response.data
    }
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    )
  }

  if (!movie) return null

  return (
    <div className="relative min-h-screen bg-zinc-900">
      {/* Background Image */}
      <div 
        className="absolute inset-x-0 top-0 h-[600px]"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_IMG_URL}${movie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/60 to-zinc-900" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 pt-40">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="w-64 flex-shrink-0">
            <img
              src={`${process.env.NEXT_PUBLIC_IMG_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>

          {/* Info */}
          <div className="flex-1 text-white">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-red-600 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-gray-300">
                {format(new Date(movie.release_date), "dd 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
              </span>
              <span className="text-gray-300">
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min
              </span>
            </div>

            <div className="flex gap-2 mb-6">
              {movie.genres.map((genre) => (
                <span 
                  key={genre.id}
                  className="bg-zinc-800 px-3 py-1 rounded-full text-sm text-gray-300"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Sinopse</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {movie.overview || "Sem sinopse disponível."}
              </p>
            </div>

            {/* Rating Form */}
            <div className="mt-8 p-6 bg-zinc-800/50 backdrop-blur-sm rounded-lg">
              <RatingForm 
                mediaType="movie"
                mediaId={movie.id}
                title={movie.title}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 