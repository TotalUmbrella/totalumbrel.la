import fs from 'fs';
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";


const contentDirectory = path.join(process.cwd(), "items");


// Get Markdown content as HTML
export default async function handler(req, res) {
  const { name } = req.query; 
  const filePath = path.join(contentDirectory, `${name}.md`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');

  const { data, content } = matter(fileContent);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  res.status(200).json({ metadata: data, contentHtml });
}