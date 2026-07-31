/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keystatic stores images locally under public/images, so no remote image hosts
  // are needed. Add remotePatterns here if you ever serve images from a CDN.
  images: {},
}

export default nextConfig
