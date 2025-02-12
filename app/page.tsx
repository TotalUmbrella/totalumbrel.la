"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getMarkdownNames } from "./markdown";
import Link from "next/link";

export default function Home() {
  const [names, setNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchNames = async () => {
      const names = await getMarkdownNames();
      setNames(names);
    };

    fetchNames();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-left justify-between min-h-screen py-2 w-2/5">
        <header className="font-[Ubuntu] text-2xl width-full flex flex-row items-center mt-2 mb-4 justify-first font-normal height-10">
          $ ls ~/totalumbrel.la <span className="cursor"></span>
        </header>
        <main className="width-full flex-grow flex flex-col items-left justify-first py-5">
          words and stuff blah blah blah
          <br/>
          <br/>
          ill write more later

          <ul className="list-disc pl-5">
            {Array.isArray(names) && names.map((name) => (
              <li key={name} className="text-lg font-medium">
                <Link href={`/items/${name}`}>
                  <a>{name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </main>
        <footer className="mb-5 width-full flex flex-row items-center justify-between text-lg font-medium">
        <div>
         © Jerry Zhang
        </div>
        <div>
          gyatt
        </div>
        </footer>
      </div>
    </div>
  );
}