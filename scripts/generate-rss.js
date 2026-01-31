
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const worksPath = path.join(__dirname, '../src/assets/data/works.json');
const outputPath = path.join(__dirname, '../public/rss.xml');

// Read works.json
const worksData = JSON.parse(fs.readFileSync(worksPath, 'utf8'));

// RSS Header
const rssHeader = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>IMTSGHR PORTFOLIO 2026</title>
  <link>https://ariesplus.com/portfolio_2026/</link>
  <description>Digital Artisan based in Tokyo. Art Direction, UI/UX, and Motion Design.</description>
  <language>ja</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
`;

// Generate Items
const rssItems = worksData.map(work => {
  // Convert period (YYYY.MM) to Date object if possible, default to now
  let pubDate = new Date().toUTCString();
  if (work.period) {
    const [year, month] = work.period.split('.');
    if (year && month) {
      pubDate = new Date(parseInt(year), parseInt(month) - 1, 1).toUTCString();
    }
  }

  const description = work.description && work.description.solution
    ? work.description.solution
    : (work.details ? work.details.description : work.title);

  const link = work.url ? work.url : 'https://ariesplus.com/portfolio_2026/';

  return `
  <item>
    <title><![CDATA[${work.title}]]></title>
    <link>${link}</link>
    <guid isPermaLink="false">${work.id}</guid>
    <description><![CDATA[${description}]]></description>
    <pubDate>${pubDate}</pubDate>
    <category>${work.category}</category>
  </item>`;
}).join('');

// RSS Footer
const rssFooter = `
</channel>
</rss>`;

// Write to file
const rssContent = rssHeader + rssItems + rssFooter;
fs.writeFileSync(outputPath, rssContent);

console.log(`RSS Feed generated at ${outputPath}`);
