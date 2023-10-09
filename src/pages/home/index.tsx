import { ReactElement } from "react"
import { NextPageWithLayout } from "../_app.page"
import { Default } from "@/layouts/Default"
import { Heading } from "@/components/Typography/Heading"
import { CaretRight, ChartLineUp } from "phosphor-react"
import { Text } from "@/components/Typography/Text"
import { Link } from "@/components/Navigation/Link"
import { TrendingBook } from "@/components/Cards/TrendingBook"
import { Box } from "@/components/Data-Display/Box"
import { Avatar } from "@/components/Data-Display/Avatar"
import { Stars } from "@/components/Data-Display/Stars"
import Image from "next/image"

const Home: NextPageWithLayout = () => {
  return (
    <main className="mt-14 w-full max-w-app space-y-10">
      <Heading>
        <ChartLineUp />
        Início
      </Heading>

      <div className="grid-cols-home grid w-full gap-16 pr-24">
        <div className="flex flex-col gap-3">
          <Text className="mb-1 text-gray-100">Avaliações mais recentes</Text>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
            <Box
              key={number}
              className="flex-col gap-8 py-6"
              variant="secondary"
            >
              <div className="flex items-start gap-4">
                <Avatar src="https://github.com/raiane-oliveira.png" alt="" />
                <div>
                  <Text className="text-gray-100" size="md">
                    Raiane Oliveira
                  </Text>
                  <Text className="text-gray-400">Hoje</Text>
                </div>
                <Stars className="ml-auto" stars={3} />
              </div>

              <div className="flex gap-5">
                <Image
                  src="https://m.media-amazon.com/images/I/618iHJVMh4L.jpg"
                  alt=""
                  quality={100}
                  width={108}
                  height={152}
                  className="h-full w-28 rounded object-cover"
                />

                <div className="space-y-5">
                  <section>
                    <Text
                      size="md"
                      className="font-bold leading-base text-gray-100"
                    >
                      O Hobbit
                    </Text>
                    <Text className="text-gray-400">J.R.R. Tolkien</Text>
                  </section>

                  <Text>
                    Semper et sapien proin vitae nisi. Feugiat neque integer
                    donec et aenean posuere amet ultrices. Cras fermentum id
                    pulvinar varius leo a in. Amet libero pharetra nunc
                    elementum fringilla velit ipsum. Sed vulputate massa velit
                    nibh...
                    <Link
                      href={`/`}
                      variant="secondary"
                      size="sm"
                      className="inline"
                    >
                      ver mais
                    </Link>
                  </Text>
                </div>
              </div>
            </Box>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Text className="mb-1 text-gray-100">Livros populares</Text>
            <Link href="/trending-books" size="sm" variant="secondary">
              Ver todos <CaretRight />
            </Link>
          </div>

          <TrendingBook
            title="A revolução dos bichos"
            author="George Orwell"
            stars={4}
            imgProps={{
              src: "https://m.media-amazon.com/images/I/618iHJVMh4L.jpg",
              alt: "",
            }}
            as="button"
            className="text-left"
          />

          <TrendingBook
            title="A revolução dos bichos"
            author="George Orwell"
            stars={4}
            imgProps={{
              src: "https://m.media-amazon.com/images/I/618iHJVMh4L.jpg",
              alt: "",
            }}
            as="button"
            className="text-left"
          />
        </div>
      </div>
    </main>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <Default>{page}</Default>
}

export default Home
