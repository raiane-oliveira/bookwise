import type { StoryObj, Meta } from "@storybook/react"
import { Avatar, AvatarProps } from "."

export default {
  title: "Data Display/Avatar",
  component: Avatar,

  argTypes: {
    size: {
      defaultValue: "md",
      control: {
        type: "inline-radio",
      },
    },
  },

  parameters: {
    docs: {
      description: {
        component:
          "Este é um componente do Radix UI: Avatar. Todas as propriedades que você atribuir a este componente irá ser passada para <Avatar.Image /> do Radix. Ele não tem a propriedade `as`.",
      },
    },
  },
} as Meta<AvatarProps>

export const Primary: StoryObj<AvatarProps> = {
  args: {
    src: "https://github.com/raiane-oliveira.png",
    alt: "Raiane Oliveira",
  },
}

export const WithFallback: StoryObj<AvatarProps> = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Irá aparecer este estado se a imagem estiver carregando ou não carregar.",
      },
    },
  },
}
