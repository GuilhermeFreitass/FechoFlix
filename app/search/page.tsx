'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'
import { CardSkeletonGrid } from '../components/CardSkeleton'
import Link from 'next/link'
import Image from 'next/image'
import { CustomPagination } from '../components/CustomPagination'

interface SearchResult {
  id: number
  title?: string
  name?: string
  poster_path: string
  vote_average: number
  media_type: 'movie' | 'tv'
  release_date?: string
  first_air_date?: string
}

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery<{ 
    results: SearchResult[]
    total_pages: number 
  }>({
    queryKey: ['search', query, page],
    queryFn: async () => {
      const response = await api.get('/search/multi', {
        params: {
          query,
          page,
          language: 'pt-BR',
        }
      })
      return response.data
    },
    enabled: !!query
  })

  if (!query) return null

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">
        Resultados para: {query}
      </h1>

      {isLoading ? (
        <>
          <CardSkeletonGrid count={20} />
          <div className="flex justify-center mt-8">
            <CustomPagination
              current={1}
              total={10}
              onChange={() => {}}
              disabled
            />
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {data?.results.map((result) => (
              <Link 
                href={`/${result.media_type}s/${result.id}`} 
                key={result.id}
              >
                <div className="relative aspect-[2/3] group cursor-pointer overflow-hidden rounded-lg">
                  {result.poster_path ? (
                    <div className="relative aspect-[2/3] group cursor-pointer overflow-hidden rounded-lg">
                      <div className="absolute top-2 left-2 z-10 bg-black/60 px-2 py-1 rounded text-sm">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-white ml-1">{result.vote_average.toFixed(1)}</span>
                      </div>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMG_URL}${result.poster_path}`}
                        alt={result.title || result.name || 'Poster'}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-end p-4">
                        <h3 className="text-white text-center font-semibold mb-2 drop-shadow-lg">
                          {result.title || result.name}
                        </h3>
                        <span className="text-gray-300 text-sm drop-shadow-lg">
                          {result.media_type === 'movie' ? 'Filme' : 'Série'}
                        </span>
                        <span className="text-gray-300 text-sm drop-shadow-lg">
                          {new Date(
                            result.release_date || result.first_air_date || ''
                          ).getFullYear()}
                        </span>
                      </div>
                    </div>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>

          {data?.total_pages && data.total_pages > 1 && (
            <div className="flex justify-center mt-8">
              <CustomPagination
                current={page}
                total={data.total_pages}
                onChange={setPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

// Componente de loading para o Suspense
function SearchLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <CardSkeletonGrid count={20} />
      <div className="flex justify-center mt-8">
        <CustomPagination
          current={1}
          total={1}
          onChange={() => {}}
          disabled
        />
      </div>
    </div>
  )
}

// Componente principal que envolve o SearchResults com Suspense
export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchResults />
    </Suspense>
  )
} 