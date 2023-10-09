import { Meta, StoryObj } from "@storybook/react"
import { NavLink, NavLinkProps } from "."
import { ChartLineUp } from "phosphor-react"

export default {
  title: "Navigation/NavLink",
  component: NavLink,

  args: {
    href: "/",
    icon: ChartLineUp,
    children: "Início",
  },
  parameters: {
    docs: {
      description: {
        component:
          "Por padrão, o NavLink sempre será um `Link` do NextJS, mas podemos alterar isso com a propriedade `as`.",
      },
    },
  },
} as Meta<NavLinkProps>

export const Primary: StoryObj<NavLinkProps> = {}
