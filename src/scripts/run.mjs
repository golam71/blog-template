import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogDir = path.resolve(__dirname, "../blog");
const ogScript = path.resolve(__dirname, "og.mjs");
const cssFile = path.resolve(__dirname, "../styles/global.css");

// Function to extract CSS variables with fallback values
function getCSSVariables(filePath) {
    try {
        const cssContent = fs.readFileSync(filePath, "utf-8");
        const mainBgMatch = cssContent.match(/--main-bg:\s*([^;]+)/);
        const accentMatch = cssContent.match(/--accent:\s*([^;]+)/);
        return {
            mainBg: mainBgMatch ? mainBgMatch[1].trim() : "#ffffff",
            accent: accentMatch ? accentMatch[1].trim() : "#000000"
        };
    } catch (err) {
        console.error("Error reading CSS file, using fallback values:", err);
        return { mainBg: "#ffffff", accent: "#000000" };
    }
}

const { mainBg, accent } = getCSSVariables(cssFile);

async function ensureImageFiles(directory) {
    const files = await fs.promises.readdir(directory);
    const mdFiles = files.filter(file => file.endsWith(".md") || file.endsWith(".mdx"));
    const imagesDir = path.join(directory, "images");

    // Create images directory if it doesn't exist
    await fs.promises.mkdir(imagesDir, { recursive: true });
    console.log(`Found directory: ${directory}`);
    console.log(`  Found ${mdFiles.length} blog files.`);

    let allTags = [];
    let latestDate = "2000-01-01";
    let createdImages = 0;
    let skippedImages = 0;

    for (const file of mdFiles) {
        const filePath = path.join(directory, file);
        const content = await fs.promises.readFile(filePath, "utf-8");
        const { data } = matter(content);
        
        const title = data.title || "Untitled";
        const tags = data.tags ? data.tags.map(t => `#${t}`).join(",") : "#general";
        let  pubDate = data.pubDate || "Unknown Date";
        
        if (data.tags) allTags.push(...data.tags);
        if (data.pubDate && new Date(data.pubDate) > new Date(latestDate)) {
            latestDate = data.pubDate;
        }

        pubDate =  pubDate !== "Unknown Date" ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(pubDate.split('/').reverse().join('-'))) : pubDate;

        const fileNameWithoutExt = path.parse(file).name;
        const imagePath = path.join(imagesDir, `${fileNameWithoutExt}.png`);

        if (!fs.existsSync(imagePath)) {
            execSync(`node ${ogScript} --text "${title}" --tags "${tags}" --date "${pubDate}" --border1Color "#00000000" --border2Color "${accent}" --borderRadius 70 --fontSize 60 -h 1000 -w 1200 -o "${imagePath}"`);
            createdImages++;
        } else {
            skippedImages++;
        }
    }

    // Generate image for directory itself
    const tagCounts = allTags.reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
    }, {});
    const topTags = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([tag]) => `#${tag}`);

const formattedLatestDate = latestDate !== "2000-01-01" 
    ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        .format(new Date(latestDate.split('/').reverse().join('-')))
    : "Unknown Date";

const mainImagePath = path.join(imagesDir, `${path.basename(directory)}.png`);
if (!fs.existsSync(mainImagePath)) {
    execSync(`node ${ogScript} --text "${path.basename(directory)}" --tags "${topTags.length > 0 ? topTags.join(",") : "#general"}" --date "${formattedLatestDate}" --border1Color "#00000000" --border2Color "${accent}" --borderRadius 70 --fontSize 60 -h 1000 -w 1200 -o "${mainImagePath}"`);
    createdImages++;
} else {
    skippedImages++;
}


    console.log(`  Image directory ensured.`);
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

