"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../app/globals.css"
import Link from "next/link";

interface Metadata {
  title: string;
  date: string;
  tags: string[];
}

interface Tags {
  [key: string]: string;
}

export default function Page() {
    const router = useRouter();
    const name = router.query.name;
    const [metadata, setMetadata] = useState<Metadata | null>(null);
    const [contentHtml, setContentHtml] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [tags, setTags] = useState<Tags | null>(null);

    useEffect(() => {
      fetch(`/api/markdown?name=${name}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setMetadata(data.metadata);
          setContentHtml(data.contentHtml);
          setIsLoading(false);
        });
    }, [name]);

    useEffect(() => {
      fetch('/api/getTags')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setTags(data.tags);
        });
      }, []);
    if (isLoading) {
      return <p className="w-full h-full flex justify-center items-center"></p>;
    }
    if (!contentHtml) {
      return <p></p>;
    }
    if (metadata && tags)
    {
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
            <div className="width-full flex flex-col">
                    <h1 className="text-3xl font-semibold">{metadata.title}</h1>
                    <div className="flex flex-row items-center justify-start">
                    <p className="text-sm font-light textName">{metadata.date}</p>
                    <div className="w-2/5 flex justify-start flex-row items-start mx-2">
                      {metadata.tags.map((tag2) =>  <div style = {{ color: tags[tag2]}}className="mx-1 text-base">#{tag2}</div>)}
                    </div>
                    </div>
            </div>
            <div className="markdownbody" dangerouslySetInnerHTML={{ __html: contentHtml }}></div>
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

  }