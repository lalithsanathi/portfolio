import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// React Compiler (Babel) is slow on cold Rolldown dev startup; keep it for `vite build` only.
export default defineConfig(({ command }) => ({
  plugins: [
    tailwindcss(),
    react(),
    ...(command === 'build'
      ? [babel({ presets: [reactCompilerPreset()] })]
      : []),
  ],
}))
