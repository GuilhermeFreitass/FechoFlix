'use client'

import { useQuery } from '@tanstack/react-query'
import { Layout } from 'antd'
import { api } from '@/lib/axios'
import HeroSection from './components/HeroSection'
import MovieCarousel from './components/MovieCarousel'
import TrendingMovies from './components/TrendingMovies'
import TrendingTVShows from './components/TrendingTVShows'

const { Content } = Layout

interface Movie {
  id: number
  title: string
  backdrop_path: string
  overview: string
  poster_path: string
  vote_average: number
}

interface TVShow {
  id: number
  name: string
  overview: string
  poster_path: string
  vote_average: number
}

export default function Home() {
  const { data: movies } = useQuery<{ results: Movie[] }>({
    queryKey: ['popular-movies'],
    queryFn: async () => {
      const response = await api.get('/movie/top_rated', {
        params: {
          language: 'pt-BR',
          region: 'BR'
        }
      })
      const data = response.data
      // Ordena por nota e pega apenas os top 11 (5 para carousel + 6 para grid)
      const sortedResults = [...data.results]
        .sort((a, b) => b.vote_average - a.vote_average)
        .slice(0, 11)
      
      return {
        ...data,
        results: sortedResults
      }
    }
  })

  const { data: tvShows } = useQuery<{ results: TVShow[] }>({
    queryKey: ['popular-tv'],
    queryFn: async () => {
      const response = await api.get('/tv/top_rated', {
        params: {
          language: 'pt-BR',
          region: 'BR'
        }
      })
      const data = response.data
      // Ordena por nota e pega apenas os top 6
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
          {movies && <MovieCarousel movies={movies.results.slice(0, 5)} />}
          {movies && <TrendingMovies movies={movies.results.slice(5)} />}
          {tvShows && <TrendingTVShows shows={tvShows.results} />}
        </div>
      </Content>
    </Layout>
  )
}