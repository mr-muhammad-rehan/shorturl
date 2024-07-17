import dynamic from "next/dynamic";
const ShortrenForm = dynamic(() => import("../components/ShortenForm"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
            Short URL
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Paste the URL to be shortened
          </p>
          <ShortrenForm />
          <p className="text-center text-gray-500 mt-6">
            ShortURL is a free tool to shorten URLs and generate short links.
            URL shortener allows to create a shortened link making it easy to
            share.
          </p>
        </div>
      </div>
    </>
  );
}
