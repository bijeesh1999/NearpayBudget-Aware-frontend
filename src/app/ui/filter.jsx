import { Filter } from "lucide-react";
import React from "react";

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Pending", value: "Pending" },
  { label: "Inactive", value: "Inactive" },
];

export function FilterField({params, setParams}) {
  const handleFilter = (e) => {
    console.log({ e: e.target.value });
    setParams((prev) => ({
      ...params,
      status: e.target.value,
    }));
  };
  return (
    <div className="relative md:w-1/4">
      <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none mr-10" />
      <select
        value={params?.filter}
        onChange={(e) => handleFilter(e)}
        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
      >
        <option value="">Select one option</option>
        {statusOptions.map((option, index) => (
          <option key={index} value={option.value || option.label}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
