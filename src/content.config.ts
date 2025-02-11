// Import the glob loader
import { glob } from "astro/loaders";
// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `loader` and `schema` for each collection
const blog = defineCollection({
	loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/blog" }),
	schema: z.object({
		title: z.string(),
		pubDate: z
			.string()
			.regex(
				/^\d{1,2}-\d{1,2}-\d{4}$/,
				"Date must be in d-m-yyyy or dd-mm-yyyy format",
			)
			.transform((str) => {
				const [day, month, year] = str.split("-").map(Number);

				// Validate day and month ranges
				if (day < 1 || day > 31 || month < 1 || month > 12) {
					throw new Error(
						"Invalid date: day must be 1-31 and month must be 1-12.",
					);
				}

				return new Date(year, month - 1, day);
			}),
		description: z.string(),
		author: z.string(),
		image: z.object({
			url: z.string(),
			alt: z.string(),
		}),
		tags: z.array(z.string()),
	}),
});
// Export a single `collections` object to register your collection(s)
export const collections = { blog };
