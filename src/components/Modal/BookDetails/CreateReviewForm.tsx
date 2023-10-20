import { Button } from "@/components/Actions/Button"
import { Avatar } from "@/components/Data-Display/Avatar"
import { Box } from "@/components/Data-Display/Box"
import { TextArea } from "@/components/Form/TextArea"
import { Text } from "@/components/Typography/Text"
import { useSession } from "next-auth/react"
import { Check, Star, X } from "phosphor-react"
import { useState } from "react"

import * as Toggle from "@radix-ui/react-toggle"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/lib/axios"
import { AxiosError } from "axios"
import {
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "@tanstack/react-query"

interface CreateReviewFormProps {
  onCancelUserRating: () => void
  bookId: string
  refetchData?: (
    options?: (RefetchOptions & RefetchQueryFilters) | undefined,
  ) => void
}

const MAX_LENGTH_REVIEW = 1000

const createReviewFormSchema = z.object({
  review: z
    .string()
    .min(1, { message: "A avaliação não pode estar em branco." })
    .max(
      MAX_LENGTH_REVIEW,
      `Não pode passar de ${MAX_LENGTH_REVIEW} caracteres.`,
    ),
  stars: z
    .number({ required_error: "O livro precisa de pelo menos 1 estrela." })
    .min(1, { message: "O livro precisa de pelo menos 1 estrela." })
    .max(5),
  userId: z.string(),
  bookId: z.string(),
})

type CreateReviewFormData = z.infer<typeof createReviewFormSchema>

export function CreateReviewForm({
  onCancelUserRating,
  bookId,
  refetchData,
}: CreateReviewFormProps) {
  const [rating, setRating] = useState({
    stars: 0,
    hoverStars: 0,
  })

  const session = useSession()

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<CreateReviewFormData>({
    defaultValues: {
      userId: session.data?.user.id,
      bookId: bookId,
      review: "",
    },
    resolver: zodResolver(createReviewFormSchema),
  })

  const mutation = useMutation({
    mutationFn: (data: CreateReviewFormData) => {
      return api.post(`/reviewed-book/${bookId}/create`, {
        review: data.review,
        stars: data.stars,
        userId: data.userId,
        bookId: data.bookId,
      })
    },
  })

  if (session.status === "unauthenticated") return null

  const starsArr = Array.from(Array(5).keys())

  async function handleCreateUserReview(data: CreateReviewFormData) {
    try {
      await mutation.mutateAsync(data)
      onCancelUserRating()
      if (refetchData) {
        refetchData()
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          alert(
            "Você já avaliou esse livro. Edite a sua avaliação ou a apague.",
          )
          onCancelUserRating()
          return
        }
        alert("Não foi possível avaliar o livro. Tente novamente mais tarde.")
      }
    }
  }

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(handleCreateUserReview)}
      variant="secondary"
      className="flex-col p-6"
    >
      <div className="flex flex-wrap items-start gap-4">
        <Avatar src={session.data?.user.avatar_url} alt="" />
        <Text
          size="md"
          className="my-auto font-bold leading-base text-gray-100"
        >
          {session.data?.user.name}
        </Text>

        <div className="sm:ml-auto">
          {starsArr.map((star) => (
            <Toggle.Root
              key={star}
              onMouseEnter={() => {
                setRating((state) => ({
                  ...state,
                  hoverStars: star + 1,
                }))
              }}
              onMouseLeave={() =>
                setRating((state) => ({ ...state, hoverStars: 0 }))
              }
              className="pl-1"
              pressed={rating.stars === star + 1}
              onPressedChange={() => {
                setRating({ stars: star + 1, hoverStars: 0 })
                setValue("stars", star + 1)
              }}
            >
              <Star
                weight={
                  rating.hoverStars >= star + 1 || rating.stars >= star + 1
                    ? "fill"
                    : "regular"
                }
                className="h-5 w-5 text-purple-100 sm:h-7 sm:w-7"
              />
            </Toggle.Root>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:gap-3">
        <div className="h-[10.25rem]">
          <Controller
            control={control}
            name="review"
            render={({ field }) => (
              <TextArea
                placeholder="Escreva sua avaliação"
                className="h-full w-full"
                {...field}
              >
                <Text className="absolute bottom-1 right-2 z-50 text-[#7C7C8A]">
                  {field.value.length}/{MAX_LENGTH_REVIEW}
                </Text>
              </TextArea>
            )}
          />
        </div>

        <div>
          {errors.review && (
            <Text className="inline-block text-red-500">
              {errors.review?.message}
            </Text>
          )}{" "}
          {errors.stars && (
            <Text className="inline-block text-red-500">
              {errors.stars?.message}
            </Text>
          )}
        </div>

        <div className="ml-auto flex gap-2">
          <Button
            onClick={onCancelUserRating}
            disabled={isSubmitting}
            className="disabled:cursor-not-allowed disabled:opacity-70"
          >
            <X className="text-purple-100" />
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="disabled:cursor-wait disabled:opacity-70"
          >
            <Check className="text-green-100" />
          </Button>
        </div>
      </div>
    </Box>
  )
}
