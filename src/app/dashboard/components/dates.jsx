"use client";
import React from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { listCategory } from "@/src/redux/slices/category.slice";

// Helper: Formats a Date object into YYYY-MM string for the month input value
const formatDateToYYYYMM = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

// Helper: Converts a YYYY-MM string back to a Date object (set to the 1st day)
const parseYYYYMMToDate = (yyyyMm) => {
  const [year, month] = yyyyMm.split("-").map(Number);
  // month - 1 because Date constructor uses 0-indexed months
  return new Date(year, month - 1, 1);
};

export const Month = () => {
  const [currentMonthYear, setCurrentMonthYear] = React.useState(
    formatDateToYYYYMM(new Date())
  );

  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.expenses);

  // Helper: Handle Month Change using offset (for Chevron buttons)
  const changeMonth = (offset) => {
    const currentDate = parseYYYYMMToDate(currentMonthYear); // '2025-06' → Date object
    const newDate = new Date(
      currentDate.setMonth(currentDate.getMonth() + offset)
    );
    setCurrentMonthYear(formatDateToYYYYMM(newDate)); // Date object → '2025-06'
  };

  // Handler for the date picker input (type="month")
  const handleMonthChange = (event) => {
    const newYYYYMM = event.target.value;
    setCurrentMonthYear(newYYYYMM);
  };

  // Format month for display
  const formatMonthDisplay = (yyyyMm) => {
    const date = parseYYYYMMToDate(yyyyMm);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  React.useEffect(() => {
    dispatch(listCategory(currentMonthYear));
  }, [currentMonthYear, dispatch]);

  React.useEffect(() => {
    if (["created"].includes(status)) {
      dispatch(listCategory(currentMonthYear));
    }
  }, [status]);

  console.log(currentMonthYear);

  return (
    <div className="flex items-center space-x-2">
      {/* --- Chevron Left --- */}
      <button
        onClick={() => changeMonth(-1)}
        className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
        aria-label="Previous Month"
      >
        <ChevronLeft size={20} />
      </button>

      {/* --- Date Picker Input (Clickable Area) --- */}
      <div
        className="relative flex items-center justify-center space-x-2 
                   bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors 
                   p-2 md:p-1 w-[180px] h-10 shadow-sm cursor-pointer border border-gray-200"
      >
        {/* 1. Calendar Icon (Visual element, doesn't capture clicks) */}
        <Calendar size={18} className="text-gray-500 pointer-events-none" />

        {/* 2. Display Text (Visual element, doesn't capture clicks) */}
        <span className="font-bold text-gray-800 whitespace-nowrap pointer-events-none">
          {formatMonthDisplay(currentMonthYear)}
        </span>

        {/* 3. Invisible Input Overlay (THE FIX IS HERE) */}
        <input
          type="month"
          value={currentMonthYear}
          onChange={handleMonthChange}
          // The key fix is replacing opacity-0 with bg-transparent and text-transparent
          className="
            absolute inset-0 
            w-full h-full 
            bg-transparent 
            text-transparent 
            cursor-pointer 
            z-10
            border-none
          "
          aria-label="Select Month and Year"
        />
      </div>

      {/* --- Chevron Right --- */}
      <button
        onClick={() => changeMonth(1)}
        className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
        aria-label="Next Month"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
