/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/manufacturing',
        destination: '/quality',
        permanent: true,
      },
      {
        source: '/research',
        destination: '/quality',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
