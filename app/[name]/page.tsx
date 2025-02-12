'use client';

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Name({}) {
    const router = useRouter();
    const { name } = router.query;
    const [metadata, setMetadata] = useState({});
    const [contentHtml, setContentHtml] = useState("");
    console.log(name);
          useEffect(() => {
              if (name) {
                const fetchData = async () => {
                  const response = await fetch(`/api/markdown/${name}`);
                  if (response.status === 404) {
                    console.error('File not found');
                    return;
                  }
                  const data = await response.json();
                  setMetadata(data.metadata);
                  setContentHtml(data.contentHtml);
                };
          
                fetchData();
              }
            }, [name]);
    return (
        <div>
            gyatt
        </div>
    )
  }
