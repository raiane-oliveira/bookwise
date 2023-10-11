import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const categories = await prisma.category.findMany()
  return res.status(200).json(categories)
}
