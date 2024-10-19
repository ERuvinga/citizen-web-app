/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['s.france24.com', 'www.google.com'],
  },
};

module.exports = nextConfig;
