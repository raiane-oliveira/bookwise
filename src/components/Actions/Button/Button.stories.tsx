import type { Meta, StoryObj } from "@storybook/react"
import { Button, ButtonProps } from "."
import { X } from "phosphor-react"

export default {
  title: "Actions/Button",
  component: Button,

  args: {
    children: <X />,
    "aria-label": "Fechar",
  },
  parameters: {
    docs: {
      description: {
        component:
          "Por padrão, o Button sempre será um `<button>` do HTML, mas podemos alterar isso com a propriedade `as`.",
      },
    },
  },
} as Meta<ButtonProps>

export const Primary: StoryObj<ButtonProps> = {}
