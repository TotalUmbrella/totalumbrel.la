import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDirectory = path.join(process.cwd(), "items");

export default function getMarkdownNames(req, res) {
    const contentDirectory = path.join(process.cwd(), "items");
    const names = fs.readdirSync(contentDirectory).map((file) => file.replace(".md", ""));
    res.status(200).json(names);
}

// Get Markdown content as HTML
export async function getMarkdownByName(name: string) {
  const filePath = path.join(contentDirectory, `${name}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContent);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    name,
    metadata: data, // title, date, etc.
    contentHtml,
  };
}
