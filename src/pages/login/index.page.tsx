import { BackgroundLogin, Logo } from "@/assets"
import { Box } from "@/components/Data-Display/Box"
import { Heading } from "@/components/Typography/Heading"
import { Text } from "@/components/Typography/Text"
import Image from "next/image"
import Link from "next/link"
import { RocketLaunch } from "phosphor-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { Google } from "@/components/SignIn/Google"
import { GitHub } from "@/components/SignIn/GitHub"
import { NextSeo } from "next-seo"

export default function Login() {
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    async function navigateToHomePage() {
      await router.push("/")
    }

    if (session.status === "authenticated") {
      navigateToHomePage()
    }
  }, [session.status, router])

  return (
    <>
      <NextSeo
        title="Faça seu login | BookWise"
        description="BookWise é um site para avaliação e gerenciamento de leituras."
      />
      <div className="bg-gray-800">
        <main
          className={`mx-auto flex min-h-screen max-w-app justify-center gap-8 p-8 font-sans sm:p-5 md:justify-between`}
        >
          <div className="relative grid w-full max-w-xl place-content-center overflow-hidden rounded-lg max-sm:hidden">
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
              <Google />
              <GitHub />
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
    </>
  )
}
