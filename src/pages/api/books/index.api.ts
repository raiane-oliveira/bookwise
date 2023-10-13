import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).end()
  }

  const limitResults = String(req.query.limit)
  const books = await prisma.book.findMany({
    take: Number(limitResults) || undefined,
    orderBy: {
      name: "asc",
    },
    include: {
      authors: true,
      categories: true,
      reviewed_books: true,
    },
  })

  if (!books) {
    return res.json({
      books: [],
    })
  }

  return res.status(200).json(books)
}
