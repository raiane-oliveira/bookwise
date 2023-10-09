import type { StoryObj, Meta } from "@storybook/react"
import { Text, TextProps } from "."

export default {
  title: "Typography/Text",
  component: Text,

  args: {
    children: "Explorar",
  },
  argTypes: {
    size: {
      defaultValue: "sm",
      control: {
        type: "inline-radio",
      },
    },
    className: {
      control: {
        type: "text",
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Por padrão, o Text sempre será um `p`, mas podemos alterar isso com a propriedade `as`.",
      },
    },
  },
} as Meta<TextProps>

export const Primary: StoryObj<TextProps> = {}
