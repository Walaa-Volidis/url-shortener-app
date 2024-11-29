"use client";
import React from "react";
import ShortenUrl from "./components/shorten-url";
import UrlList from "./components/url-list";
import { useUrl } from "@/app/hooks/useUrl";
import { useUser } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function URLShortener() {
  const { user } = useUser();
  const userId = user?.id;
  const { addUrl } = useUrl(userId);
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

  const handleCopy = (shortenedUrl: string) => {
    navigator.clipboard.writeText(shortenedUrl);
  };

  const handleVisit = (shortenedUrl: string) => {
    window.open(`https://${shortenedUrl}`, "_blank");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {userId && <ShortenUrl userId={userId} addUrl={addUrl} />}
      <UrlList
        shortenedUrls={shortenedUrls}
        onCopy={handleCopy}
        onVisit={handleVisit}
      />
      <ToastContainer />
    </div>
  );
}
