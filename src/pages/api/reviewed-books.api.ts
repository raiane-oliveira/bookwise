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
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(400).end()
  }

  const prismaRecentReviewedBooks = await prisma.reviewedBook.findMany({
    where: {
      created_at: {
        lte: dayjs().add(RECENT_BOOKS_LIMIT_DAYS, "day").toDate(),
      },
    },
    include: {
      user: true,
      book: true,
    },
  })

  const recentReviewedBooks = prismaRecentReviewedBooks.sort(() => {
    return -1
  })

  const lastReviewedUserBook = await prisma.reviewedBook.findMany({
    where: {
      user_id: session?.user.id,
    },
    include: {
      book: true,
    },
  })

  return res.status(200).json({
    recentReviewedBooks,
    lastReviewedUserBook: lastReviewedUserBook[lastReviewedUserBook.length - 1],
  })
}
