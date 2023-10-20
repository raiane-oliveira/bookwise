import { Sidebar } from "@/components/Sidebar"
import { queryClient } from "@/lib/react-query"
import { QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface DefaultProps {
  children: ReactNode
}

export function Default({ children }: DefaultProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <div
          className={`min-h-screen items-start gap-24 bg-gray-800 p-5 pl-12 md:flex md:pl-20 xl:pl-[20.5rem]`}
        >
          <Sidebar />
          {children}
        </div>
      </SessionProvider>
    </QueryClientProvider>
  )
}
