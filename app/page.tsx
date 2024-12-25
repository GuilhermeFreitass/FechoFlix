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
  release_date: string
}

export default function Home() {
  const { data: popularMovies, isLoading: isLoadingPopular } = useQuery<{ results: Movie[] }>({
    queryKey: ['popular-movies'],
    queryFn: async () => {
      const response = await api.get('/movie/popular', {
        params: {
          language: 'pt-BR',
          region: 'BR'
        }
      })
      return {
        ...response.data,
        results: response.data.results.slice(0, 5)
      }
    }
  })

  const { data: topRatedMovies, isLoading: isLoadingTopRated } = useQuery<{ results: Movie[] }>({
    queryKey: ['top-rated-movies'],
    queryFn: async () => {
      const response = await api.get('/movie/top_rated', {
        params: {
          language: 'pt-BR',
          region: 'BR'
        }
      })
      return {
        ...response.data,
        results: response.data.results.slice(0, 6)
      }
    }
  })

  const { data: tvShows, isLoading: isLoadingTVShows } = useQuery<{ results: TVShow[] }>({
    queryKey: ['top-rated-tv'],
    queryFn: async () => {
      const response = await api.get('/tv/top_rated', {
        params: {
          language: 'pt-BR',
          region: 'BR'
        }
      })
      return {
        ...response.data,
        results: response.data.results.slice(0, 6)
      }
    }
  })

  const isLoading = isLoadingPopular || isLoadingTopRated

  return (
    <Layout className="min-h-screen bg-zinc-900">
      <Content>
        <HeroSection />
        
        <div className="pt-16 space-y-8">
          {isLoading ? (
            <section className="max-w-7xl mx-auto px-4">
              <CardSkeletonGrid count={11} />
            </section>
          ) : (
            <>
              {popularMovies && <MovieCarousel movies={popularMovies.results} />}
              {topRatedMovies && <TrendingMovies movies={topRatedMovies.results} />}
            </>
          )}

          {isLoadingTVShows ? (
            <section className="max-w-7xl mx-auto px-4 py-16">
              <h2 className="text-3xl font-bold text-white mb-8">Séries em Alta</h2>
              <CardSkeletonGrid count={6} />
            </section>
          ) : (
            tvShows && <TrendingTVShows shows={tvShows.results} />
          )}
        </div>
      </Content>
    </Layout>
  )
}