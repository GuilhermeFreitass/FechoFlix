import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  params: {
    api_key: process.env.NEXT_PUBLIC_API_KEY,
    language: 'pt-BR',
  },
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para respostas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Erro de autenticação com a API do TMDB')
    }
    return Promise.reject(error)
  }
) 