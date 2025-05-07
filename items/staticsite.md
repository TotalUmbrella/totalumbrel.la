---
title: "A Next.js Static Site Generator"
date: "2025-04-19"
tags: ["project"]
---

<span class="first">T</span>his post its own parent site, a statically generated portfolio built using Next.js. All of the posts written before this date were actually written in retrospect, and dated for when the projects were created.

> You can find a publically available github repo, including the raw markdown blog files on [my github](https://github.com/TotalUmbrella/totalumbrel.la)

So how does this site actually work? 

<figure class="center-image">
  <Image src="images/staticsite/flowchart.png" alt="Alt text"/>
  <figcaption>low effort flow chart courtesy of <a href = "https://app.diagrams.net/">draw.io</a></figcaption>
</figure>

As seen in the above flowchart, the site is generated statically using Next.js with the functions `getStaticPaths()` and `getStaticProps()`. 

On build time, a template file `[name].tsx` otherwise commonly called `[slug].tsx` calls the functions `getStaticPaths()`

```javascript
export const getStaticPaths = async () => {

  const files = fs.readdirSync('items')

  return {
    paths: files.map(filename => ({
      params: {
        name: filename.replace(".md", "")
      }
    })),
    fallback: false
  }
}
```

which instantiates a new page for every file in the directory 'items'.

