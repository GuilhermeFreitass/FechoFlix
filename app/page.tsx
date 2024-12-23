'use client'

import { useQuery } from '@tanstack/react-query'
import { Layout } from 'antd'
import { api } from '@/lib/axios'
import HeroSection from './components/HeroSection'
import MovieCarousel from './components/MovieCarousel'
import TrendingMovies from './components/TrendingMovies'
import TrendingTVShows, { TVShow } from './components/TrendingTVShows'
import { CardSkeletonGrid } from './components/CardSkeleton'

const { Content } = Layout

interface Movie {
  id: number
  title: string
  backdrop_path: string
  overview: string
  poster_path: string
  vote_average: number
}

export default function Home() {
  const { data: movies, isLoading: isLoadingMovies } = useQuery<{ results: Movie[] }>({
    queryKey: ['popular-movies'],
    queryFn: async () => {
      const response = await api.get('/movie/top_rated', {
        params: {
          language: 'pt-BR',
          region: 'BR'
        }
      })
      const data = response.data
      const sortedResults = [...data.results]
        .sort((a, b) => b.vote_average - a.vote_average)
        .slice(0, 11)
      
      return {
        ...data,
        results: sortedResults
      }
    }
  })

  const { data: tvShows, isLoading: isLoadingTVShows } = useQuery<{ results: TVShow[] }>({
    queryKey: ['popular-tv'],
    queryFn: async () => {
      const response = await api.get('/tv/top_rated', {
        params: {
          language: 'pt-BR',
          region: 'BR'
        }
      })
      const data = response.data
      const sortedResults = [...data.results]
        .sort((a, b) => b.vote_average - a.vote_average)
        .slice(0, 6)
      
      return {
        ...data,
        results: sortedResults
      }
    }
  })

  return (
    <Layout className="min-h-screen bg-zinc-900">
      <Content>
        <HeroSection />
        
        <div className="pt-16 space-y-8">
          {isLoadingMovies ? (
            <>
              <section className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-white mb-8">Filmes em Alta</h2>
                <CardSkeletonGrid count={5} />
              </section>
              <section className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-white mb-8">Filmes Populares</h2>
                <CardSkeletonGrid count={4} />
              </section>
            </>
          ) : (
            <>
              {movies && <MovieCarousel movies={movies.results.slice(0, 5)} />}
              {movies && <TrendingMovies movies={movies.results.slice(5)} />}
            </>
          )}

          {isLoadingTVShows ? (
            <section className="max-w-7xl mx-auto px-4 py-16">
              <h2 className="text-3xl font-bold text-white mb-8">Séries em Alta</h2>
              <CardSkeletonGrid count={4} />
            </section>
          ) : (
            tvShows && <TrendingTVShows shows={tvShows.results} />
          )}
        </div>
      </Content>
    </Layout>
  )
}