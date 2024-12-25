import Link from 'next/link'
import Image from 'next/image'

export interface TVShow {
  id: number
  name: string
  backdrop_path: string
  overview: string
  poster_path: string
  vote_average: number
  first_air_date: string
}

interface TrendingTVShowsProps {
  shows: TVShow[]
}

export default function TrendingTVShows({ shows }: TrendingTVShowsProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-white mb-8">Destaques com Melhores Notas: Séries</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {shows.map((show) => (
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
    </section>
  )
} 