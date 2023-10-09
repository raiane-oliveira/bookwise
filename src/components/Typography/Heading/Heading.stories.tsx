import type { StoryObj, Meta } from "@storybook/react"
import { Heading, HeadingProps } from "."
import { Binoculars } from "phosphor-react"

export default {
  title: "Typography/Heading",
  component: Heading,

  args: {
    children: "Explorar",
  },
  parameters: {
    docs: {
      description: {
        component:
          "Por padrão, o Heading sempre será um `h1`, mas podemos alterar isso com a propriedade `as`.",
      },
    },
  },
} as Meta<HeadingProps>

export const Primary: StoryObj<HeadingProps> = {}

export const WithIcon: StoryObj<HeadingProps> = {
  args: {
    children: (
      <>
        <Binoculars />
        Explorar
      </>
    ),
  },
}
