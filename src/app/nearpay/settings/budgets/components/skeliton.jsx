import React from "react";

/**
 * LoaderCards
 * Renders 3 horizontal loader cards with exact size 700x50px.
 */
export function LoaderCards({ count = 3 }) {
  return (
    <div className="flex flex-col items-center space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-[600px] rounded-md bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 overflow-hidden"
        >
          <div
            className="h-[50px] bg-gray-200 dark:bg-gray-700 animate-pulse"
            style={{ width: "700px" }}
          />
        </div>
      ))}
    </div>
  );
}

/**
 * NoDataCard
 * Renders a centered card with width 700px and height 500px to indicate empty state.
 */
export function NoDataCard({ message = "No data found", actionLabel, onAction }) {
  return (
    <div className="flex justify-center">
      <div
        className="w-[700px] h-[500px] rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center p-6 text-center"
        role="status"
      >
        <svg
          className="h-16 w-16 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m2 0a6 6 0 11-12 0 6 6 0 0112 0z" />
        </svg>

        <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-gray-100">{message}</h3>
        {actionLabel ? (
          <button
            onClick={onAction}
            className="mt-6 px-4 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default LoaderCards;
