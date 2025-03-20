import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'tags.dat');
    const data = fs.readFileSync(filePath, 'utf8');


    // this splits the raw tag data into a 2d array
    const conCatTags = data.split("\r\n");
    const newTags = conCatTags.map((tagColor) => {
      const tag = tagColor.split("%");
      return tag;
    });


    // this convers the array into map (javascript dictionary)
    // I understand converting to an array and then a map is not the most efficient way to do this but i hate myself and im not rewriting this
    const map1 = new Map();
    for(let i = 0; i<newTags.length; i++){
      map1.set(newTags[i][0], newTags[i][1]);
    }
    
    res.status(200).json({ tags: map1 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to read tags' });
  }
}