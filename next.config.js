/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
