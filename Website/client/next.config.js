module.exports = {
  images: {
    domains: ["localhost", "media.forgecdn.net", "static.wikia.nocookie.net"],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"],
  },
};
