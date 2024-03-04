import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      rotate: {
        '60': '60deg',
      },
      media: {
        'sm': '(min-width: 300px)',
        'md': '(min-width: 768px)',
        'lg': '(min-width: 1024px)',
        'xl': '(min-width: 1280px)',
        '2xl': '(min-width: 1536px)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'footer-texture': "url('/img/footer-texture.png')",
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
