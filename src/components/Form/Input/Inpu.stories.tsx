import type { StoryObj, Meta } from "@storybook/react"
import { Input, InputProps } from "."

export default {
  title: "Form/Input",
  component: Input,

  args: {
    placeholder: "Placeholder",
  },

  parameters: {
    docs: {
      description: {
        component: "Este componente não tem a propriedade `as`.",
      },
    },
  },
} as Meta<InputProps>

export const Primary: StoryObj<InputProps> = {}
