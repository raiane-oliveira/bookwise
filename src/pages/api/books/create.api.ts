import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).end()
  }

  const createBookFormSchema = z.object({
    name: z.string().min(1, "Não pode estar vazio."),
    image_url: z.string().optional(),
    year: z.number().int("Ano inválido.").optional(),
    pages: z
      .number()
      .int("Número de páginas inválidas.")
      .min(1, "Número de páginas inválidas."),
    authors: z.array(
      z.object({
        id: z.string().min(1),
      }),
    ),
    categories: z.array(
      z.object({
        id: z.string().min(1),
      }),
    ),
  })

  const { name, image_url, authors, categories, year, pages } =
    createBookFormSchema.parse(req.body)

  await prisma.book.create({
    data: {
      name,
      image_url,
      year,
      pages,
      authors: {
        connect: authors,
      },
      categories: {
        connect: categories,
      },
    },
  })

  return res.status(201).end()
}
