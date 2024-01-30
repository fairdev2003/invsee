module.exports = { 
    images: { domains: ['localhost', "media.forgecdn.net"], formats: ['image/avif', 'image/webp']},
    experimental: {
        esmExternals: "loose",
        serverComponentsExternalPackages: ["mongoose"]
      },
}
