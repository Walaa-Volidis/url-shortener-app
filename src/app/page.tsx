"use client";
import React, { useState } from "react";
import ShortenUrl from "./components/ShortenUrl";
import UrlList from "./components/UrlList";

export default function URLShortener() {
  const [url, setUrl] = useState("");

  const shortenedUrls = [
    {
      original: "https://very-long-example-url.com/with/many/parameters?id=123",
      shortened: "short.ly/ab1x9",
      created: "2024-11-23",
    },
    {
      original: "https://another-long-example.com/blog/post/12345",
      shortened: "short.ly/cd2y8",
      created: "2024-11-22",
    },
  ];

  const handleSubmit = () => {
    console.log("Shortening URL:", url);
  };

  const handleCopy = (shortenedUrl: string) => {
    navigator.clipboard.writeText(shortenedUrl);
  };

  const handleVisit = (shortenedUrl: string) => {
    window.open(`https://${shortenedUrl}`, "_blank");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <ShortenUrl url={url} setUrl={setUrl} onSubmit={handleSubmit} />
      <UrlList
        shortenedUrls={shortenedUrls}
        onCopy={handleCopy}
        onVisit={handleVisit}
      />
    </div>
  );
}
