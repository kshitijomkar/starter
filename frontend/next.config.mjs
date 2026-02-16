/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use the correct experimental key name for Next.js 15+
  experimental: {
    allowedReplitOrigins: ["*"]
  },
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
