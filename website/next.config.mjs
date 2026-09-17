import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'framerusercontent.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/components': path.resolve(__dirname, '../src/components'),
      /* Shared, app-level config (booking link, contact email) lives with the shared components so
         the website and the root app read the same values. Mirrors the `@/components` alias. */
      '@/lib': path.resolve(__dirname, '../src/lib'),
      framer: path.resolve(__dirname, '../src/lib/framer/index.js'),
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
};

export default nextConfig;
