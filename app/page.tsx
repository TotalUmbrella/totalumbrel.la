import Image from "next/image";
import Link from "next/link";
import { getMarkdownNames } from "../pages/api/markdown";
import { Arapey } from "next/font/google";

const array = await getMarkdownNames();
console.log(array)
var projects = []
var misc = []

for(let i=0; i < array.length; i++) {
  if (array[i][1].tags.includes("project")){
    projects.push(array[i])
  } else if (array[i][1].tags.includes("misc")) {
    misc.push(array[i])
  }
}
export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-left justify-between min-h-screen py-2 w-2/5">
        <header className="font-[Ubuntu] text-2xl width-full flex flex-row items-center mt-2 mb-4 justify-first font-normal height-10">
          <Link href="/" className="header">
            $ ls ~/totalumbrel.la
          </Link>
          <span className="cursor"></span>
        </header>
        <main className="width-full flex-grow flex flex-col items-left justify-first py-5">
          
          Hi. This is a website which aims to showcase and document things that I am making/have made.
          <br/>
          <br/>
          I'm passionate about a lot of things, including engineering and programming. 
          <br/>
          you can take a look at the projects that I've been working on,
          <ul className="list-disc pl-5">
            {projects.map((name) =>  <li key={name[1].title}><Link className="link" href={`/${name[0]}`}>{name[1].title}</Link></li>)}
          </ul>
          <br/>
          <br/>
          <br/>
          or check out blog posts on some other miscellaneous stuff
          <ul className="list-disc pl-5">
            {misc.map((name) =>  <li key={name[1].title}><Link className="link" href={`/${name[0]}`}>{name[1].title}</Link></li>)}
          </ul>
          <br/>
          I will continue to add things of interest in the future.
        </main>
        <footer className="mb-5 width-full flex flex-row items-center justify-between text-lg font-medium">
        <div>
         Jerry Zhang
        </div>
        <div>
          <a target = "_blank" href="https://github.com/TotalUmbrella">
            <img src="github.png" className="logo"/>
          </a>
        </div>
        </footer>
      </div>
    </div>
  );
}