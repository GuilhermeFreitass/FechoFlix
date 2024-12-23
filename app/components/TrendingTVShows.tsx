import Image from 'next/image'
import Link from 'next/link'

export interface TVShow {
  id: number
  name: string
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
      <h2 className="text-3xl font-bold text-white mb-8">Séries em Alta</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {shows.map((show) => (
          <Link href={`/tv/${show.id}`} key={show.id}>
            <div className="relative group cursor-pointer">
              <div className="absolute top-2 left-2 z-10 bg-black/60 px-2 py-1 rounded text-sm">
                <span className="text-yellow-400">⭐</span>
                <span className="text-white ml-1">{show.vote_average.toFixed(1)}</span>
              </div>
              <Image unoptimized
                src={`${process.env.NEXT_PUBLIC_IMG_URL}${show.poster_path}`}
                alt={show.name}
                width={300}
                height={450}
                className="w-full rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col items-center justify-center p-4">
                <h3 className="text-white text-center font-semibold mb-2">
                  {show.name}
                </h3>
                <span className="text-gray-300 text-sm">
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