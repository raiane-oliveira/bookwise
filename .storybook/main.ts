import type { StorybookConfig } from "@storybook/nextjs"

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {
      fastRefresh: true,
    },
  },
  docs: {
    autodocs: true,
  },
  previewHead: (head) => `
    ${head}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700&display=swap" rel="stylesheet" />
    <style>
      body {
        --font-nunito-sans: "Nunito Sans", sans-serif;
      }
    </style>
  `,
}
export default config
