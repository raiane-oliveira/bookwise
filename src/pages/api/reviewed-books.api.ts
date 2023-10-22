import { prisma } from "@/lib/prisma"
import dayjs from "dayjs"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth].api"

const RECENT_BOOKS_LIMIT_DAYS = 5

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).end()
  }

  const session = await getServerSession(req, res, authOptions)

  const recentReviewedBooks = await prisma.reviewedBook.findMany({
    orderBy: {
      created_at: "desc",
    },
    include: {
      user: true,
      book: {
        include: {
          authors: true,
          categories: true,
        },
      },
    },
  })

  const lastReviewedUserBook = await prisma.reviewedBook.findMany({
    where: {
      user_id: session?.user.id,
    },
    include: {
      book: {
        include: {
          authors: true,
          categories: true,
        },
      },
    },
  })

  return res.status(200).json({
    recentReviewedBooks,
    lastReviewedUserBook: lastReviewedUserBook[lastReviewedUserBook.length - 1],
  })
}
