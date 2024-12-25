import Link from 'next/link'
import Image from 'next/image'

export interface Movie {
  id: number
  title: string
  poster_path: string
  backdrop_path: string
  overview: string
  vote_average: number
  release_date: string
}

interface TrendingMoviesProps {
  movies: Movie[]
}

export default function TrendingMovies({ movies }: TrendingMoviesProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-16">
      <h2 className="text-2xl font-bold text-white mb-6">Destaques com Melhores Notas: Filmes</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
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
    </section>
  )
}

