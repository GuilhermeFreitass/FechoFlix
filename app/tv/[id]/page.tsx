'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { Spin } from 'antd'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { use } from 'react'
import { RatingForm } from '@/app/components/RatingForm'

interface TVShowDetails {
  id: number
  name: string
  overview: string
  first_air_date: string
  vote_average: number
  backdrop_path: string
  poster_path: string
  number_of_seasons: number
  number_of_episodes: number
  genres: Array<{ id: number; name: string }>
  status: string
  networks: Array<{ id: number; name: string; logo_path: string }>
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default function TVShowDetails({ params }: PageProps) {
  const { id } = use(params)
  
  const { data: show, isLoading } = useQuery<TVShowDetails>({
    queryKey: ['tv-show', id],
    queryFn: async () => {
      const response = await api.get(`/tv/${id}`, {
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

  if (!show) return null

  const statusMap = {
    'Returning Series': 'Em exibição',
    'Ended': 'Finalizada',
    'Canceled': 'Cancelada',
  } as const

  return (
    <div className="relative min-h-screen bg-zinc-900">
      {/* Background Image */}
      <div 
        className="absolute inset-x-0 top-0 h-[600px]"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_IMG_URL}${show.backdrop_path})`,
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
              src={`${process.env.NEXT_PUBLIC_IMG_URL}${show.poster_path}`}
              alt={show.name}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>

          {/* Info */}
          <div className="flex-1 text-white">
            <h1 className="text-4xl font-bold mb-4">{show.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-red-600 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1">
                ⭐ {show.vote_average.toFixed(1)}
              </span>
              <span className="text-gray-300">
                {format(new Date(show.first_air_date), "dd 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
              </span>
              <span className="text-gray-300">
                {show.number_of_seasons} {show.number_of_seasons === 1 ? 'Temporada' : 'Temporadas'}
              </span>
              <span className="text-gray-300">
                {show.number_of_episodes} Episódios
              </span>
            </div>

            <div className="flex gap-2 mb-6">
              {show.genres.map((genre) => (
                <span 
                  key={genre.id}
                  className="bg-zinc-800 px-3 py-1 rounded-full text-sm text-gray-300"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Sinopse</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {show.overview || "Sem sinopse disponível."}
              </p>
            </div>

            <div className="flex flex-col gap-4 mb-8">
              <div>
                <h2 className="text-xl font-semibold mb-2">Status</h2>
                <p className="text-gray-300">
                  {statusMap[show.status as keyof typeof statusMap] || show.status}
                </p>
              </div>

              {show.networks.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Disponível em</h2>
                  <div className="flex gap-4">
                    {show.networks.map((network) => (
                      <div 
                        key={network.id}
                        className="bg-white p-2 rounded-lg"
                      >
                        <img
                          src={`${process.env.NEXT_PUBLIC_IMG_URL}${network.logo_path}`}
                          alt={network.name}
                          className="h-8 object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Rating Form */}
            <div className="mt-8 p-6 bg-zinc-800/50 backdrop-blur-sm rounded-lg">
              <RatingForm 
                mediaType="tv"
                mediaId={show.id}
                title={show.name}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 