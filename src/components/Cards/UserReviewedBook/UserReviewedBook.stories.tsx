import { Meta, StoryObj } from "@storybook/react"
import { UserReviewedBook, UserReviewedBookProps } from "."

export default {
  title: "Components/Cards/User Reviewed Book",
  component: UserReviewedBook,

  args: {
    imgProps: {
      alt: "",
      src: "https://s3.novatec.com.br/capas-ampliadas/capa-ampliada-9788575225639.jpg",
    },
    book: {
      title: "Entendendo Algoritmos",
      author: "Aditya Bhargava",
      stars: 5,
      createdAt: new Date(),
      opinion:
        "Integer at tincidunt sed mi. Venenatis nunc justo porta viverra lacus scelerisque ut orci ultricies. Massa ultrices lacus non lectus pellentesque cras posuere neque. Nunc nisl curabitur et non. Tellus senectus elit porta lorem.",
    },
  },

  argTypes: {
    imgProps: {
      description: "É o componente <Image /> do NextJS.",
    },
  },

  parameters: {
    docs: {
      description: {
        component:
          "As propriedades que esse componente receber serão passadas para o seu componente root, que é `<Box>`, fazendo com que possamos alterar `<Box>` da forma que quisermos.",
      },
    },
  },
} as Meta<UserReviewedBookProps>

export const Primary: StoryObj<UserReviewedBookProps> = {}
