import fs from 'fs';
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";


const contentDirectory = path.join(process.cwd(), "items");

export async function getMarkdownNames() {
  const names = fs.readdirSync(contentDirectory).map((file) => {
    const filePath = path.join(contentDirectory, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    const name = file.replace(".md", "");
    return [name, data];
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
  const processedContent = await remark()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);
  const contentHtml = processedContent.toString();

  res.status(200).json({ metadata: data, contentHtml });
}
