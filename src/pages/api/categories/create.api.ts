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

  const categoryFormBody = z.object({
    name: z.string().min(1),
  })

  const { name } = categoryFormBody.parse(req.body)

  await prisma.category.create({
    data: {
      name,
    },
  })

  return res.status(201).end()
}
