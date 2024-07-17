"use client";
import { FormEvent, useState } from "react";
import { IResponse } from "@/models";

export default function ShortenForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shortedUrl, setShortedUrl] = useState<string>();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const url = formData.get("url");

    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })
      .then((response) => response.json())
      .then((data: IResponse) => {
        setShortedUrl(data.url);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      {shortedUrl && (
        <div className="flex flex-1 mb-4 min-h-[20px]">
          <a href={shortedUrl} target="_new">
            {shortedUrl}{" "}
          </a>
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
