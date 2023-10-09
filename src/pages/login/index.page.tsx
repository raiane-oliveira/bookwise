import { BackgroundLogin, Logo } from "@/assets"
import { Box } from "@/components/Data-Display/Box"
import { Heading } from "@/components/Typography/Heading"
import { Text } from "@/components/Typography/Text"
import Image from "next/image"
import Link from "next/link"
import { RocketLaunch } from "phosphor-react"
import { Nunito_Sans as NunitoSans } from "next/font/google"

import { Icon } from "@iconify/react"

const nunitoSans = NunitoSans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito-sans",
})

export default function Login() {
  return (
    <div className="bg-gray-800">
      <main
        className={`${nunitoSans.variable} mx-auto flex min-h-screen max-w-app justify-center p-5 font-sans md:justify-between md:gap-4`}
      >
        <div className="relative grid w-full max-w-xl place-content-center overflow-hidden rounded-lg">
          <Image
            src={BackgroundLogin}
            alt="Menina lendo um livro deitada em um sofá."
            className="absolute inset-0 h-full w-full object-cover"
            quality={100}
          />
          <Image
            src={Logo}
            alt="Livro com um pequeno coração na parte inferior acompanhado do título BookWise."
            className="relative z-10"
            quality={100}
          />
          <div
            aria-hidden
            className="absolute -bottom-14 -left-28 h-[25.5rem] w-[25.5rem] rounded-full bg-green-100 blur-[20rem]"
          />
          <div
            aria-hidden
            className="absolute -left-44 bottom-52 h-80 w-80 rounded-full bg-purple-100 blur-[18rem]"
          />
          <div
            aria-hidden
            className="absolute -left-36 -top-16 h-52 w-52 rounded-full bg-green-100 blur-[9rem]"
          />
        </div>

        <div className="m-auto flex w-full max-w-sm flex-col gap-10">
          <section className="space-y-0.5">
            <Heading>Boas vindas!</Heading>
            <Text className="text-gray-200" size="md">
              Faça seu login ou acesse como visitante.
            </Text>
          </section>

          <div className="flex flex-col gap-4">
            <Box as="button" hasHover className="gap-5">
              <Icon icon="flat-color-icons:google" className="h-8 w-8" />
              <Text className="text-lg/relaxed font-bold text-gray-200">
                Entrar com Google
              </Text>
            </Box>
            <Box as="button" hasHover className="gap-5">
              <Icon
                icon="akar-icons:github-fill"
                className="h-8 w-8 text-white"
              />
              <Text className="text-lg/relaxed font-bold text-gray-200">
                Entrar com GitHub
              </Text>
            </Box>
            <Box as={Link} href="/" hasHover className="gap-5">
              <RocketLaunch className="h-8 w-8 text-purple-100" />
              <Text className="text-lg/relaxed font-bold text-gray-200">
                Acessar como visitante
              </Text>
            </Box>
          </div>
        </div>
      </main>
    </div>
  )
}
