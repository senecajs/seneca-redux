import dts from "vite-plugin-dts"
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  base: "./",
  plugins: [dts({ rollupTypes: true }), react()],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/seneca-redux.ts"),
      name: "mylib",
      formats: ["es", "cjs", "umd", "iife"],
      fileName: (format) => `seneca-redux.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
})
