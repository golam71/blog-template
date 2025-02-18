import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogDir = path.resolve(__dirname, "../blog");
const publicImagesDir = path.resolve(__dirname, "../../public/images");
const ogScript = path.resolve(__dirname, "og.mjs");
const cssFile = path.resolve(__dirname, "../styles/global.css");

function getCSSVariables(filePath) {
	try {
		const cssContent = fs.readFileSync(filePath, "utf-8");
		const mainBgMatch = cssContent.match(/--main-bg:\s*([^;]+)/);
		const accentMatch = cssContent.match(/--accent:\s*([^;]+)/);
		return {
			mainBg: mainBgMatch ? mainBgMatch[1].trim() : "#ffffff",
			accent: accentMatch ? accentMatch[1].trim() : "#000000",
		};
	} catch (err) {
		console.error("Error reading CSS file, using fallback values:", err);
		return { mainBg: "#ffffff", accent: "#000000" };
	}
}

const { mainBg, accent } = getCSSVariables(cssFile);

async function ensureImageFiles(directory) {
	const dirName = path.basename(directory);
	const targetImageDir = path.join(publicImagesDir, dirName);
	await fs.promises.mkdir(targetImageDir, { recursive: true });

	const files = await fs.promises.readdir(directory);
	const mdFiles = files.filter(
		(file) => file.endsWith(".md") || file.endsWith(".mdx"),
	);
	console.log(
		`Processing directory: ${dirName} (${mdFiles.length} blog files)`,
	);

	let allTags = [];
	let latestDate = "2000-01-01";
	let createdImages = 0;
	let skippedImages = 0;

	for (const file of mdFiles) {
		const filePath = path.join(directory, file);
		const content = await fs.promises.readFile(filePath, "utf-8");
		const { data } = matter(content);

		const title = data.title || "Untitled";
		const tags = data.tags
			? data.tags.map((t) => `#${t}`).join(",")
			: "#general";
		let pubDate = data.pubDate || "Unknown Date";

		if (data.tags) allTags.push(...data.tags);
		if (data.pubDate && new Date(data.pubDate) > new Date(latestDate)) {
			latestDate = data.pubDate;
		}

		const fileNameWithoutExt = path.parse(file).name;
		const imagePath = path.join(targetImageDir, `${fileNameWithoutExt}.png`);

		if (!fs.existsSync(imagePath)) {
			execSync(
				`node ${ogScript} --text "${title}" --bg "${mainBg}" --fg "${accent}" --tags "${tags}" --date "${pubDate}" --border1Color "#00000000" --border2Color "${accent}" --borderRadius 70 --fontSize 60 -h 1000 -w 1200 -o "${imagePath}"`,
			);
			createdImages++;
		} else {
			skippedImages++;
		}
	}

	const tagCounts = allTags.reduce((acc, tag) => {
		acc[tag] = (acc[tag] || 0) + 1;
		return acc;
	}, {});
	const topTags = Object.entries(tagCounts)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 5)
		.map(([tag]) => `#${tag}`);

	const mainImagePath = path.join(targetImageDir, `cover.png`);
	if (!fs.existsSync(mainImagePath)) {
		execSync(
			`node ${ogScript} --text "${dirName}" --tags "${topTags.length > 0 ? topTags.join(",") : "#general"}" --date "${latestDate}" --bg "${mainBg}" --fg "${accent}" --border1Color "#00000000" --border2Color "${accent}" --borderRadius 70 --fontSize 60 -h 1000 -w 1200 -o "${mainImagePath}"`,
		);
		createdImages++;
	} else {
		skippedImages++;
	}

	console.log(`  Skipped ${skippedImages} existing images.`);
	console.log(`  Created ${createdImages} new images.`);
}

async function processBlogDirectories() {
	try {
		const subDirs = await fs.promises.readdir(blogDir, { withFileTypes: true });
		let totalDirs = 0;

		for (const dir of subDirs) {
			if (dir.isDirectory()) {
				totalDirs++;
				await ensureImageFiles(path.join(blogDir, dir.name));
			}
		}

		console.log(`Processed ${totalDirs} directories in total.`);
	} catch (err) {
		console.error("Error reading blog directories:", err);
	}
}

processBlogDirectories();
