// @ts-check
import { defineConfig } from "astro/config";

import preact from "@astrojs/preact";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";

//htb theme https://github.com/silofy/hackthebox/blob/master/themes/HackTheBox-Lite.json
import hackthebox from "./hackthebox.json";

// https://astro.build/config
export default defineConfig({
  // site: "https://example.com",
  integrations: [preact(), mdx(), icon()],
  markdown: {
    shikiConfig: {
      theme: hackthebox,
    },
  },
});
