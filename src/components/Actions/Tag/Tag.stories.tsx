import type { StoryObj, Meta } from "@storybook/react"
import { Tag, TagProps } from "."

export default {
  title: "Actions/Tag",
  component: Tag,

  args: {
    children: "Computação",
  },

  parameters: {
    docs: {
      description: {
        component:
          "Este é um componente do Radix UI: Toggle. Ele não tem a propriedade `as`.",
      },
    },
  },
} as Meta<TagProps>

export const Primary: StoryObj<TagProps> = {}

export const Selected: StoryObj<TagProps> = {
  args: {
    pressed: true,
  },
}
