import { Search } from "lucide-react";
import React from "react";

export function SearchField({ params, setParams }) {
  const [typingTimeout, setTypingTimeout] = React.useState(null);

  const handleSearch = (e) => {
    const value = e.target.value;

    // if (typingTimeout) clearTimeout(typingTimeout);

    // const timeout = setTimeout(() => {
      setParams((prev) => ({
        ...prev,
        search: value,
      }));
    // }, 500); // debounce 500ms

    // setTypingTimeout(timeout);
  };

  return (
    <div className="relative w-full md:w-1/3 flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
        placeholder="Search name or status..."
        value={params?.search}
        onChange={handleSearch}
      />
    </div>
  );
}
