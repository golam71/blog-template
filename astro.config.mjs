// @ts-check
import { defineConfig } from "astro/config";

import preact from "@astrojs/preact";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";

//htb vscode theme https://github.com/silofy/hackthebox/blob/master/themes/HackTheBox-Lite.json
import hackthebox from "./hackthebox-lite.json";

// https://astro.build/config
export default defineConfig({
	base: "/blog-template",
	// site: "https://example.com",
	integrations: [preact(), mdx(), icon()],
	markdown: {
		shikiConfig: {
			theme: JSON.parse(JSON.stringify(hackthebox)),
		},
	},
});
