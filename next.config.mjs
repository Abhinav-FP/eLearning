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
//   async headers() {
//   return [
//     {
//       source: "/(.*)",
//       headers: [
//         {
//           key: "Content-Security-Policy",
//           value:
//             "frame-ancestors 'self' https://challenges.cloudflare.com; " +
//             "font-src 'self' https://challenges.cloudflare.com;",
//         },

//         // ❌ REMOVE THIS — it breaks Turnstile
//         // {
//         //   key: "X-Frame-Options",
//         //   value: "DENY",
//         // },

//         { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
//         { key: "X-Content-Type-Options", value: "nosniff" },
//         { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
//         { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
//       ],
//     },
//   ];
// },
};

export default nextConfig;