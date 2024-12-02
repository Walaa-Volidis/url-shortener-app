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
  const { urls, addUrl } = useUrl(userId);

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
        shortenedUrls={urls}
        onCopy={handleCopy}
        onVisit={handleVisit}
      />
      <ToastContainer />
    </div>
  );
}
