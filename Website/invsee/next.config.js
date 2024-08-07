module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "localhost",
      "media.forgecdn.net",
      "static.wikia.nocookie.net",
      "github.com",
      "encrypted-tbn0.gstatic.com",
      "res.cloudinary.com",
      "appliedenergistics.org",
      "www.minecraft.net",
    ],
    formats: ["image/avif", "image/webp"],
  },
};
