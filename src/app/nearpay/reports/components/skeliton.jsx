import React from "react";

/**
 * TableBodySkeleton
 * Renders a tbody with `rows` skeleton rows for loading state.
 * Props:
 * - rows: number of skeleton rows (default 4)
 * - columns: number of table columns to render skeleton cells for (default 5)
 */
export function TableBodySkeleton({ rows = 4, columns = 5 }) {
  return Array.from({ length: rows }).map((_, r) => (
    <tr key={r} className="hover:bg-gray-50">
      {Array.from({ length: columns }).map((__, c) => (
        <td
          key={c}
          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white hover:bg-gray-50 transition-colors"
        >
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
        </td>
      ))}
    </tr>
  ));
}

/**
 * NoDataRow
 * Renders a single table row that spans all columns and displays a no-data message.
 * Props:
 * - colSpan: number of columns to span (default 5)
 * - message: display text (default 'No data found')
 */
export function NoDataRow({ colSpan = 5, message = "No data found" }) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-300"
      >
        {message}
      </td>
    </tr>
  );
}

export default TableBodySkeleton;
