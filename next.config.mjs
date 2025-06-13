/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/embed",
        headers: [
          { key: "Content-Security-Policy", value: "default-src 'self' " },
        ],
      },
    ];
  },
   images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
