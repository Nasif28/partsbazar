"use client";

export default function Error({ error, reset }) {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h1 className="text-xl font-bold text-red-600 dark:text-red-400 mb-3">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {error.statusText || error.message}
          </p>
          <a
            href="/"
            className="text-sm px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Return Home
          </a>
        </div>
      </div>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
