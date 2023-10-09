import type { StoryObj, Meta } from "@storybook/react"
import { Stars, StarsProps } from "."

export default {
  title: "Data Display/Stars",
  component: Stars,

  args: {
    stars: 4,
  },
  argTypes: {
    totalStars: {
      description: "A propriedade `totalStars` deve ser maior que 0.",
    },
  },
} as Meta<StarsProps>

export const Primary: StoryObj<StarsProps> = {}
