import type { Preview } from "@storybook/react"
import { themes } from "@storybook/theming"

import "../src/styles/globals.css"
import "../src/lib/dayjs"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      theme: themes.dark,
    },
    backgrounds: {
      default: "dark",
    },
  },
}

export default preview
