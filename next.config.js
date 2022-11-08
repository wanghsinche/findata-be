/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  darkMode: false,
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/start',
        permanent: true,
      },
    ]
  },

}
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = nextConfig
