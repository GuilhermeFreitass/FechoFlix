export default function HeroSection() {
  return (
    <section className="h-screen flex flex-col items-center justify-center px-4 relative">
      <div className="absolute inset-0 bg-gradient-radial from-zinc-900 via-zinc-900/90 to-zinc-900" />
      
      <div className="relative z-10 text-center space-y-8">
        <h1 className="text-6xl md:text-8xl font-bold text-red-600 mb-4 animate-fade-in">
          FechoFlix
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto animate-fade-in-up">
          Descubra os melhores filmes e séries em um só lugar. Sua próxima aventura cinematográfica começa aqui.
        </p>
        
        <div className="animate-bounce mt-12">
          <p className="text-gray-400 text-sm">Role para explorar</p>
          <svg 
            className="w-6 h-6 mx-auto mt-2 text-gray-400" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  )
}
