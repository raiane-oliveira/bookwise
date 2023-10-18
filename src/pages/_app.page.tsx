import "@/styles/globals.css"
import "@/lib/dayjs"

import type { AppProps } from "next/app"
import { ReactElement, ReactNode } from "react"
import { NextPage } from "next"
import { SessionProvider } from "next-auth/react"

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

import { Nunito_Sans as NunitoSans } from "next/font/google"

const nunitoSans = NunitoSans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito-sans",
})

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <>
      <style jsx global>
        {`
          :root {
            --font-nunito-sans: ${nunitoSans.style.fontFamily};
          }
        `}
      </style>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      ,
    </>,
  )
}
