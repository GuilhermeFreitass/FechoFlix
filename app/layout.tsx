import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { Navbar } from "./components/Navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: 'FechoFlix',
  description: 'Descubra os melhores filmes e séries em um só lugar.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen bg-zinc-900">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}

