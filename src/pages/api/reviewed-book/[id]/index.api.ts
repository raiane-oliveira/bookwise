import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).end()
  }

  const bookId = String(req.query.id)

  if (!bookId) {
    return res.status(400).json({
      message: "Must include book id.",
    })
  }

  const reviewedBookUsers = await prisma.reviewedBook.findMany({
    where: {
      book_id: bookId,
    },
    orderBy: {
      created_at: "desc",
    },
    include: {
      user: true,
    },
  })

  return res.status(200).json(reviewedBookUsers)
}
