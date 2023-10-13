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

  const createReviewBody = z.object({
    review: z.string().min(1).max(1000),
    stars: z.number().min(1).max(5),
    userId: z.string().min(1),
    bookId: z.string().min(1),
  })

  const { review, bookId, stars, userId } = createReviewBody.parse(req.body)

  const userAlreadyReviewedBook = await prisma.user.findUnique({
    where: {
      id: userId,
      reviewed_books: {
        some: {
          book_id: bookId,
        },
      },
    },
  })

  if (userAlreadyReviewedBook) {
    return res.status(409).json({ message: "User already review this book." })
  }

  await prisma.reviewedBook.create({
    data: {
      review,
      stars,
      book_id: bookId,
      user_id: userId,
    },
  })

  const userRatingReviews = await prisma.reviewedBook.findMany({
    where: {
      book_id: bookId,
    },
    select: {
      stars: true,
    },
  })

  const newAverageRatingBook =
    userRatingReviews.reduce((accumulator, currentEl) => {
      return (accumulator += Number(currentEl.stars))
    }, 0) / userRatingReviews.length

  await prisma.book.update({
    where: {
      id: bookId,
    },
    data: {
      rating: Number(newAverageRatingBook.toFixed(1)),
    },
  })

  return res.status(201).end()
}
