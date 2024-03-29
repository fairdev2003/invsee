module.exports = {
  images: {
    domains: ["localhost", "media.forgecdn.net", "static.wikia.nocookie.net", "github.com", "encrypted-tbn0.gstatic.com", "res.cloudinary.com", "appliedenergistics.org"],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"],
  },
};
