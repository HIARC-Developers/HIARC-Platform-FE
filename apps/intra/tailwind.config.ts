import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  /* eslint-disable @typescript-eslint/no-require-imports */
  presets: [require('../../tailwind.config.ts')],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
