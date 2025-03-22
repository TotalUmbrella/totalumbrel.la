import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'tags.dat');
    const data = fs.readFileSync(filePath, 'utf8');


    const conCatTags = data.split("\r\n");
    const newTags = conCatTags.map((tagColor) => {
      const tag = tagColor.split("%");
      return tag;
    });
    const tagDictionary = {};
    for (let i = 0; i < newTags.length; i++) {
      tagDictionary[newTags[i][0]] = newTags[i][1];
    }
    res.status(200).json({ tags: tagDictionary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to read tags' });
  }
}