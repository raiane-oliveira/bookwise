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
import { DefaultSeo } from "next-seo"

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
        <DefaultSeo
          openGraph={{
            type: "website",
            locale: "pt_BR",
            url: "https://raianebookwise.vercel.app/",
            siteName: "BookWise",
            title: "BookWise",
          }}
          additionalLinkTags={[
            {
              rel: "apple-touch-icon",
              href: "/apple-touch-icon.png",
              sizes: "180x180",
            },
            {
              rel: "icon",
              type: "image/png",
              sizes: "32x32",
              href: "/favicon-32x32.png",
            },
            {
              rel: "icon",
              type: "image/png",
              sizes: "16x16",
              href: "/favicon-16x16.png",
            },
            {
              rel: "manifest",
              href: "/site.webmanifest",
            },
            {
              rel: "mask-icon",
              href: "/safari-pinned-tab.svg",
              color: "#8381d9",
            },
          ]}
          additionalMetaTags={[
            {
              name: "msapplication-TileColor",
              content: "#8381d9",
            },
            {
              name: "theme-color",
              content: "#0E1116",
            },
          ]}
        />

        <Component {...pageProps} />
      </SessionProvider>
      ,
    </>,
  )
}
