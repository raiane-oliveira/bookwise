import "@/styles/globals.css"
import "@/lib/dayjs"

import type { AppProps } from "next/app"
import { Nunito_Sans as NunitoSans } from "next/font/google"

const nunitoSans = NunitoSans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito-sans",
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${nunitoSans.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  )
}
