/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "api.ts", "api.tsx"],
  images: {
    domains: ["m.media-amazon.com", "books.google.com", "play.google.com"],
  },
}

module.exports = nextConfig
