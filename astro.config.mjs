// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";

import preact from "@astrojs/preact";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";

//htb vscode theme https://github.com/silofy/hackthebox/blob/master/themes/HackTheBox-Lite.json
import hackthebox from "./hackthebox.json";

// https://astro.build/config
export default defineConfig({
  base: "/blog-template",
  // site: "https://example.com",
  integrations: [preact(), mdx(), icon()],
  vite: {
    resolve: {
      alias: {
        // match the path mappings in tsconfig so imports like
        // import Header from "@components/Header.astro" work during build
        "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
        "@components/": fileURLToPath(new URL("./src/components/", import.meta.url)),
        "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
        "@layouts/": fileURLToPath(new URL("./src/layouts/", import.meta.url)),
        // lightweight alias for imports like "~/..."
        "~/": fileURLToPath(new URL("./src/", import.meta.url)),
      },
    },
  },
  markdown: {
    shikiConfig: {
      theme: JSON.parse(JSON.stringify(hackthebox)),
    },
  },
});
