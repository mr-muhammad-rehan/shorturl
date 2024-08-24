"use client";

import { confettiDefault } from "@/lib/generalConfig";
import { ViewCountResponseData } from "@/pages/api/view-counts";
import confetti from "canvas-confetti";
import { FormEvent, useState } from "react";

export default function ViewCount() {
    const [views, setViews] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget)
        const url = formData.get('url');

        fetch("/api/view-counts", {
            method: "POST",
            body: JSON.stringify({ url }),
        }).then((res) => res.json())
            .then((data: ViewCountResponseData) => {
                if (data.views > 0)
                    confetti(confettiDefault);
                setViews(data.views);
            })
            .finally(() => setIsLoading(false));
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 pb-2 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
                    View your shortened URL Counts
                </h1>
                {views > 0 && <h2 className="text-center text-3xl mb-4 text-blue-700">
                    {views}
                </h2>}
                <p className="text-center text-gray-600 mb-6">
                    Paste the URL to view counts
                </p>
                <form className="flex flex-col" onSubmit={onSubmit}>
                    <input
                        type="url"
                        name="url"
                        placeholder="e.g https://domain.com/XXXXXX"
                        className="p-3 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center w-full"
                        disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'View Counts'}
                    </button>
                </form>
                <div className="mt-8 flex row flex-center">
                    <a href="/" className="text-blue-600">&#x2190; Back</a>
                </div>
            </div>
        </div>
    );
}