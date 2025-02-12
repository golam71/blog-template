import { createCanvas } from 'canvas';
import fs from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
  .option('text', { alias: 't', description: 'Text to display', type: 'string', demandOption: true })
  .option('bg', { alias: 'b', description: 'Background color', type: 'string', default: '#0b121f' })
  .option('fg', { alias: 'f', description: 'Text color', type: 'string', default: '#9fef00' })
  .option('border1Color', { alias: 'c1', description: 'First border color', type: 'string', default: '#9fef00' })
  .option('border2Color', { alias: 'c2', description: 'Second border color', type: 'string', default: '#9fef00' })
  .option('height', { description: 'Image height', type: 'string', default: '630' })
  .option('width', { alias: 'w', description: 'Image width', type: 'string', default: '1200' })
  .option('fontSize', { alias: 's', description: 'Font size', type: 'string', default: '40' })
  .option('borderRadius', { alias: 'r', description: 'Border radius', type: 'string', default: '20' })
  .option('tags', { alias: 'g', description: 'Tags to display', type: 'string', default: '' })
  .option('date', { alias: 'd', description: 'Date to display', type: 'string', default: '' })
  .option('output', { alias: 'o', description: 'Output filename', type: 'string', default: 'output.png' })
  .help()
  .alias('help', 'H')
  .argv;

const height = parseInt(argv.height, 10);
const width = parseInt(argv.width, 10);
const fontSize = parseInt(argv.fontSize, 10);
const borderRadius = parseInt(argv.borderRadius, 10);
const tagFontSize = Math.floor(fontSize / 2);
const padding = 40; // Keeps content inside the first border

if (isNaN(height) || isNaN(width) || isNaN(fontSize) || isNaN(borderRadius)) {
  console.error('Error: Height, width, font size, and border radius must be valid numbers.');
  process.exit(1);
}

const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Function to draw a rounded rectangle
function drawRoundedRect(ctx, x, y, width, height, radius, strokeColor) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.strokeStyle = strokeColor;
  ctx.stroke();
}

// Fill background
ctx.fillStyle = argv.bg;
ctx.fillRect(0, 0, width, height);

// Draw borders
const borderThickness = 5;
const borderGap = 30;

ctx.lineWidth = borderThickness;
drawRoundedRect(ctx, borderGap / 2, borderGap / 2, width - borderGap, height - borderGap, borderRadius, argv.border1Color);
drawRoundedRect(ctx, borderGap + borderThickness, borderGap + borderThickness, 
               width - 2 * (borderGap + borderThickness), 
               height - 2 * (borderGap + borderThickness), borderRadius, argv.border2Color);

// Text settings
ctx.font = `bold ${fontSize}px sans-serif`;
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillStyle = argv.fg;

const maxTextWidth = width - 2 * padding;
const lineHeight = fontSize * 1.2;

// Function to wrap text properly
function getLines(ctx, phrase, maxPxLength) {
  const words = phrase.split(" ");
  let lines = [], currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    if (ctx.measureText(currentLine + " " + word).width < maxPxLength) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

const lines = getLines(ctx, argv.text, maxTextWidth);
const totalTextHeight = lines.length * lineHeight;
const startY = (height - totalTextHeight) / 3;

lines.forEach((line, index) => {
  ctx.fillText(line, width / 2, startY + index * lineHeight);
});

// Draw tags (fully rounded pills)
ctx.font = `bold ${tagFontSize}px sans-serif`;
const tags = argv.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

if (tags.length > 0) {
  const tagPadding = 15;
  const tagHeight = tagFontSize * 1.5;
  const tagRadius = tagHeight / 2;
  const tagSpacing = 10;
  const maxTagWidth = width - 2 * padding;

  let tagY = height - tagFontSize * 6 - padding;
  let tagX = padding;
  let currentLineWidth = 0;
  let currentLineTags = [];

  // Function to draw a line of tags
  function drawTagLine(tags, startX, startY) {
    const totalTagWidth = tags.reduce((sum, tag) => sum + ctx.measureText(tag).width + 2 * tagPadding, 0) + (tags.length - 1) * tagSpacing;
    let startTagX = (width - totalTagWidth) / 2;

    tags.forEach((tag) => {
      const tagWidth = ctx.measureText(tag).width + 2 * tagPadding;

      // Draw rounded tag background
      ctx.fillStyle = argv.fg;
      ctx.beginPath();
      ctx.arc(startTagX + tagRadius, startY + tagRadius, tagRadius, Math.PI / 2, (Math.PI * 3) / 2);
      ctx.arc(startTagX + tagWidth - tagRadius, startY + tagRadius, tagRadius, (Math.PI * 3) / 2, Math.PI / 2);
      ctx.closePath();
      ctx.fill();

      // Draw tag text
      ctx.fillStyle = argv.bg;
      ctx.fillText(tag, startTagX + tagWidth / 2, startY + tagFontSize * 0.75);

      startTagX += tagWidth + tagSpacing;
    });
  }

  // Group tags into multiple lines
  tags.forEach((tag) => {
    const tagWidth = ctx.measureText(tag).width + 2 * tagPadding;

    if (currentLineWidth + tagWidth > maxTagWidth) {
      drawTagLine(currentLineTags, tagX, tagY);
      tagY += tagHeight + tagSpacing;
      currentLineTags = [tag];
      currentLineWidth = tagWidth;
    } else {
      currentLineTags.push(tag);
      currentLineWidth += tagWidth + tagSpacing;
    }
  });

  // Draw last line of tags
  if (currentLineTags.length > 0) {
    drawTagLine(currentLineTags, tagX, tagY);
    tagY += tagHeight + tagSpacing;
  }

  // Place date below last tag line
  ctx.fillStyle = argv.fg;
  ctx.fillText(argv.date, width / 2, tagY + tagFontSize);
}

// Save to the specified output file
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(argv.output, buffer);
console.log(`Image saved as ${argv.output}`);
