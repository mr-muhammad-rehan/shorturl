'use client';

import { FormEvent, useState } from "react";
import confetti from "canvas-confetti";
import { confettiDefault } from "@/lib/generalConfig";
import { GenerateCountResponse } from "@/pages/api/generate-url";

export default function ShortenForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shortedUrl, setShortedUrl] = useState<string>();
  const [isCopied, setIsCopied] = useState<boolean>(false);

  async function handleCopy() {
    if (!shortedUrl) return;
    await navigator.clipboard.writeText(shortedUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    confetti(confettiDefault);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const url = formData.get("url");
    if (!url) return;
    fetch("/api/generate-url", {
      method: "POST",
      body: JSON.stringify({ url }),
    }).then((res) => res.json())
      .then((data: GenerateCountResponse) => setShortedUrl(data.url))
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      {shortedUrl && (
        <div className="flex flex-row justify-between mb-4 min-h-[20px] border border-dashed p-2">
          <a
            href={shortedUrl}
            target="_new"
            className="font-semibold text-purple-900 text-sm"
          >
            {shortedUrl}{" "}
          </a>
          <span className="flex flex-row">
            <span
              onClick={handleCopy}
              className="material-icons cursor-pointer"
            >
              content_copy
            </span>
            {isCopied && (
              <span className="text-green-500 text-sm ml-2">Copied!</span>
            )}
          </span>
        </div>
      )}
      <form className="flex flex-col" onSubmit={onSubmit}>
        <input
          type="url"
          name="url"
          placeholder="Enter the link here"
          className="p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? <div className="spinner"></div> : "Shorten URL"}
        </button>
      </form>
    </>
  );
}

export function ShortenFormSkeleton() {
  return (
    <div className="animate-pulse flex flex-col">
      <div className="h-12 bg-gray-200 rounded mb-4"></div>
    </div>
  );
}