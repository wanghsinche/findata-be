/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = nextConfig
