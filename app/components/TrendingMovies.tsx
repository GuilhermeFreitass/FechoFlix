import { Typography, Card } from 'antd'
import Link from 'next/link'

const { Title } = Typography
const { Meta } = Card

interface Movie {
  id: number
  title: string
  poster_path: string
  overview: string
  vote_average: number
}

interface TrendingMoviesProps {
  movies: Movie[]
}

export default function TrendingMovies({ movies }: TrendingMoviesProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-white mb-8">Filmes em Alta</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <Link href={`/movies/${movie.id}`} key={movie.id}>
            <div className="relative group cursor-pointer">
              <div className="absolute top-2 left-2 z-10 bg-black/60 px-2 py-1 rounded text-sm">
                <span className="text-yellow-400">⭐</span>
                <span className="text-white ml-1">{movie.vote_average.toFixed(1)}</span>
              </div>
              <img
                src={`${process.env.NEXT_PUBLIC_IMG_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                <h3 className="text-white text-center px-2 font-semibold">
                  {movie.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

