import withPWA from 'next-pwa';

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
};

const pwaConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
};

export default withPWA(pwaConfig)(nextConfig);
