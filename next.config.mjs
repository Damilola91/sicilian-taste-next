/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    // Prefer using `remotePatterns` instead of `domains` to be explicit
    // about allowed protocols and paths. This mitigates risks from
    // malicious hosts and provides more control.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.gettyimages.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
