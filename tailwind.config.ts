import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-nunito-sans)'],
      },
    },
  },
  plugins: [],
}
export default config
