import { Sidebar } from "@/components/Sidebar"
import { queryClient } from "@/lib/react-query"
import { QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import { Nunito_Sans as NunitoSans } from "next/font/google"
import { ReactNode } from "react"

const nunitoSans = NunitoSans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito-sans",
})

interface DefaultProps {
  children: ReactNode
}

export function Default({ children }: DefaultProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <div
          className={`${nunitoSans.variable} flex min-h-screen gap-24 bg-gray-800 p-5 font-sans`}
        >
          <Sidebar />
          {children}
        </div>
      </SessionProvider>
    </QueryClientProvider>
  )
}
