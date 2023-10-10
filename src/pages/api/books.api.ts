import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const limitResults = String(req.query.limit)
  const books = limitResults
    ? await prisma.book.findMany({
        take: Number(limitResults),
        orderBy: {
          rating: "desc",
        },
      })
    : await prisma.book.findMany({
        orderBy: {
          rating: "desc",
        },
      })

  if (!books) {
    return res.json({
      books: [],
    })
  }

  return res.status(200).json(books)
}
