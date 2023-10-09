import { Meta, StoryObj } from "@storybook/react"
import { TrendingBook, TrendingBookProps } from "."

export default {
  title: "Components/Cards/Trending Book",
  component: TrendingBook,

  args: {
    title: "A revolução dos bichos",
    imgProps: {
      alt: "",
      src: "https://m.media-amazon.com/images/I/618iHJVMh4L.jpg",
    },
    author: "George Orwell",
    stars: 4,
  },

  argTypes: {
    imgProps: {
      description: "É o componente <Image /> do NextJS.",
    },
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
