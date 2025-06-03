/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // domains: ['student-teacher-platform.sgp1.digitaloceanspaces.com'],
    // remotePatterns: [new URL('https://student-teacher-platform.sgp1.digitaloceanspaces.com/**')],
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
};

export default nextConfig;
