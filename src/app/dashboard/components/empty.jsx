import React from "react";

export default function EmptyCard({
  loading = false,
  title = "No items",
  description = "Nothing to show here yet.",
  actionLabel,
  onAction,
}) {
  return loading ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse flex flex-col justify-between p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700 text-sm w-70 30"
        >
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-12 w-12" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-100 dark:border-gray-700">
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m2 0a6 6 0 11-12 0 6 6 0 0112 0z"
          />
        </svg>

        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
          {description}
        </p>

        {actionLabel ? (
          <div className="mt-4">
            <button
              type="button"
              onClick={onAction}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >
              {actionLabel}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
