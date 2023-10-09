import type { StoryObj, Meta } from "@storybook/react"
import { Box, BoxProps } from "."
import { Text } from "../../../components/Typography/Text"

export default {
  title: "Data Display/Box",
  component: Box,

  args: {
    children: (
      <Text>
        Nec tempor nunc in egestas. Euismod nisi eleifend at et in sagittis.
        Penatibus id vestibulum imperdiet a at imperdiet lectu...
      </Text>
    ),
  },

  argTypes: {
    variant: {
      defaultValue: "primary",
      control: {
        type: "inline-radio",
      },
    },
    size: {
      defaultValue: "md",
      control: {
        type: "inline-radio",
      },
    },
    hasHover: {
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
          "Por padrão, Box sempre será uma `div`, mas podemos alterar isso com a propriedade `as`.",
      },
    },
  },
} as Meta<BoxProps>

export const Primary: StoryObj<BoxProps> = {}

export const Secondary: StoryObj<BoxProps> = {
  args: {
    variant: "secondary",
  },
}

export const SmallWithHover: StoryObj<BoxProps> = {
  args: {
    size: "sm",
    hasHover: true,
    as: "button",
  },
}
