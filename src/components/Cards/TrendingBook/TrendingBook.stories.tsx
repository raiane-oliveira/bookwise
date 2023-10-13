import { Meta, StoryObj } from "@storybook/react"
import { TrendingBook, TrendingBookProps } from "."

export default {
  title: "Components/Cards/Trending Book",
  component: TrendingBook,

  args: {
    book: {
      name: "A revolução dos bichos",
      author: "George Orwell",
      created_at: new Date(),
      id: "1",
      pages: 152,
      category: { id: "2", name: "Fantasia", created_at: new Date() },
      image_url: "https://m.media-amazon.com/images/I/618iHJVMh4L.jpg",
      reviewed_books: [],
    },
  },

  argTypes: {
    wasRead: {
      defaultValue: false,
      control: {
        type: "boolean",
      },
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
} as Meta<TrendingBookProps>

export const Primary: StoryObj<TrendingBookProps> = {}

export const Read: StoryObj<TrendingBookProps> = {
  args: {
    wasRead: true,
  },
}
