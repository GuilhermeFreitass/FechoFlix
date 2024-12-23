interface TVShow {
  id: number
  name: string
  overview: string
  poster_path: string
  vote_average: number
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
          <div key={show.id} className="relative group cursor-pointer">
            <div className="absolute top-2 left-2 z-10 bg-black/60 px-2 py-1 rounded text-sm">
              <span className="text-yellow-400">⭐</span>
              <span className="text-white ml-1">{show.vote_average.toFixed(1)}</span>
            </div>
            <img
              src={`${process.env.NEXT_PUBLIC_IMG_URL}${show.poster_path}`}
              alt={show.name}
              className="w-full rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
              <h3 className="text-white text-center px-2 font-semibold">
                {show.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
} 