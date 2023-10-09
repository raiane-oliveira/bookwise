import type { StoryObj, Meta } from "@storybook/react"
import { Link, LinkProps } from "."
import { CaretLeft, CaretRight } from "phosphor-react"

export default {
  title: "Navigation/Link",
  component: Link,

  args: {
    children: (
      <>
        <CaretLeft />
        Link
        <CaretRight />
      </>
    ),
  },

  parameters: {
    docs: {
      description: {
        component:
          "Por padrão, o Link sempre será um `Link` do NextJS, mas podemos alterar isso com a propriedade `as`.",
      },
    },
  },
  argTypes: {
    children: {
      control: {
        type: null,
      },
    },
    variant: {
      options: ["primary", "secondary"],
      control: {
        type: "inline-radio",
      },
    },
    size: {
      options: ["sm", "md"],
      control: {
        type: "inline-radio",
      },
    },
  },
} as Meta<LinkProps>

export const Primary: StoryObj<LinkProps> = {
  args: {
    variant: "primary",
    size: "md",
    href: "/",
  },
}

export const Secondary: StoryObj<LinkProps> = {
  args: {
    variant: "secondary",
    size: "md",
    href: "/",
  },
}

export const AsButton: StoryObj<LinkProps> = {
  args: {
    as: "button",
    children: <>Button</>,
  },
}
