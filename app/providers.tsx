'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ConfigProvider, App } from "antd"
import { PropsWithChildren, useState } from "react"
import ptBR from 'antd/locale/pt_BR'

export function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        locale={ptBR}
        theme={{
          token: {
            colorPrimary: '#dc2626',
          },
        }}
      >
        <App>
          {children}
        </App>
      </ConfigProvider>
    </QueryClientProvider>
  )
} 