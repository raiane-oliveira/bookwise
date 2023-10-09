import type { StoryObj, Meta } from "@storybook/react"
import { TextArea, TextAreaProps } from "."

export default {
  title: "Form/TextArea",
  component: TextArea,

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
} as Meta<TextAreaProps>

export const Primary: StoryObj<TextAreaProps> = {}
