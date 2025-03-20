import fs from 'fs';
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";


const contentDirectory = path.join(process.cwd(), "items");

export async function getMarkdownNames() {
  const names = fs.readdirSync(contentDirectory).map((file) => {
    const filePath = path.join(contentDirectory, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    const name = file.replace(".md", "");
    const title = data.title || name;
    return [name, title];
  });
  return names;
}

// Get Markdown content as HTML
export default async function handler(req, res) {
  const name = req.query.name;
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