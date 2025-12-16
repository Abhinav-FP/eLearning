/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'student-teacher-platform.sgp1.digitaloceanspaces.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i.vimeocdn.com',
        pathname: '**',
      },
    ],
  },
  env:{
    NEXT_PUBLIC_PAYPAL_CLIENT_ID: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  },
  async headers() {
    return [
      {
        source: "/(.*)", // apply to all routes
        headers: [
          { key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' https://challenges.cloudflare.com;
              frame-src https://challenges.cloudflare.com;
              font-src https://challenges.cloudflare.com data:;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data:;
              connect-src 'self';
              frame-ancestors 'self';
            `
              .replace(/\s+/g, " ")
              .trim(),
          },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;