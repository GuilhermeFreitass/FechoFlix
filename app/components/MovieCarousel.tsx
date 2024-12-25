'use client'

import { Carousel } from 'antd'
import Link from 'next/link'
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import { useRef } from 'react'
import { Movie } from './TrendingMovies'

interface MovieCarouselProps {
  movies: Movie[]
}

export default function MovieCarousel({ movies }: MovieCarouselProps) {
  const carouselRef = useRef<any>(null)

  return (
    <div className="relative group">
      <Carousel 
        ref={carouselRef}
        autoplay 
        className="w-full [&_.slick-dots]:!bottom-10 [&_.slick-dots_li.slick-active_button]:!bg-red-600 [&_.slick-dots_li_button]:!bg-white/40"
      >
        {movies.map((movie) => (
          <Link href={`/movies/${movie.id}`} key={movie.id}>
            <div className="relative h-[70vh] cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${process.env.NEXT_PUBLIC_IMG_URL}${movie.backdrop_path})`,
                  backgroundPosition: 'center 20%'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/60 to-zinc-900" />
              </div>
              <div className="relative h-full max-w-7xl mx-auto flex flex-col justify-end px-8 md:px-20 pb-32">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="text-gray-300 text-sm">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {movie.title}
                </h2>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl line-clamp-3">
                  {movie.overview}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>

      {/* Setas de navegação */}
      <button 
        onClick={() => carouselRef.current?.prev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <CaretLeftOutlined className="text-2xl" />
      </button>
      
      <button 
        onClick={() => carouselRef.current?.next()}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <CaretRightOutlined className="text-2xl" />
      </button>
    </div>
  )
}

