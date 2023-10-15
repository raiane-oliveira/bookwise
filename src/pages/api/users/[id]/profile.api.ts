import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).end()
  }

  const userId = String(req.query.id)

  if (!userId) {
    return res.status(400).end()
  }

  const userProfile = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      reviewed_books: {
        orderBy: {
          created_at: "desc",
        },
        include: {
          book: {
            include: {
              authors: true,
              categories: true,
            },
          },
        },
      },
    },
  })

  const pagesRead = userProfile?.reviewed_books.reduce(
    (acc, review) => (acc += review.book.pages),
    0,
  )
  const amountBookReviewed = userProfile?.reviewed_books.length

  const authorsWithoutDuplication = new Set(
    userProfile?.reviewed_books.reduce((acc: string[], reviewBook) => {
      for (const author of reviewBook.book.authors) {
        acc.push(author.name)
      }

      return acc
    }, []),
  )

  const categories = userProfile?.reviewed_books.reduce(
    (acc: string[], reviewBook) => {
      for (const category of reviewBook.book.categories) {
        acc.push(category.name)
      }

      return acc
    },
    [],
  )

  const categoriesNameString = String(categories?.join(""))
  const categoriesWithoutDuplication = Array.from(new Set(categories))

  const numberOccurrencesOfCategories = categoriesWithoutDuplication?.map(
    (category) => {
      let count = categoriesNameString.split(category).length - 1

      return {
        name: category,
        occurrence: count,
      }
    },
  )

  const maxNumberOccurrence = numberOccurrencesOfCategories.reduce(
    (acc, currentValue) => {
      const max = Math.max(acc, currentValue.occurrence)
      acc = max

      return acc
    },
    0,
  )

  const mostReadCategories = numberOccurrencesOfCategories.filter(
    (category) => category.occurrence === maxNumberOccurrence,
  )

  return res.status(200).json({
    profile: {
      ...userProfile,
      pagesRead,
      booksReviewed: amountBookReviewed,
      authorsRead: authorsWithoutDuplication.size,
      mostReadCategories,
    },
  })
}
