"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Header } from "../components/header";
import { Month } from "../dashboard/components/dates";
import { useSelector } from "react-redux";

// --- MOCK DATA (Reused from Dashboard) ---
const INITIAL_DATA = [
  { id: 1, name: "Food & Dining", limit: 600, spent: 450 },
  { id: 2, name: "Transportation", limit: 200, spent: 120 },
  { id: 3, name: "Entertainment", limit: 300, spent: 350 }, // Over budget
  { id: 4, name: "Shopping", limit: 500, spent: 180 },
  { id: 5, name: "Utilities", limit: 300, spent: 295 },
  { id: 6, name: "Travel", limit: 1000, spent: 1050 }, // Over budget
];
// --- END MOCK DATA ---

const ReportPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1)); // June 2025

  const { categories } = useSelector((state) => state.category);

  console.log({ categories });

  // Helper: Format Currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Helper: Handle Month Change
  const changeMonth = (offset) => {
    const newDate = new Date(
      currentDate.setMonth(currentDate.getMonth() + offset)
    );
    setCurrentDate(new Date(newDate));
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <Header>
        <Month />
      </Header>

      {/* --- REPORT TABLE --- */}
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Forces horizontal scroll on small screens */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Budget Limit
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount Spent
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Remaining
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories?.map((item) => {
                const remaining = item?.category?.limitCents - item?.totalSpent;
                const isOverBudget = remaining < 0;

                return (
                  <tr key={item._id} className="hover:bg-gray-50">
                    {/* Category Name */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white hover:bg-gray-50 transition-colors">
                      {item?.name}
                    </td>

                    {/* Budget Limit */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      {formatCurrency(item?.budget?.limitCents)}
                    </td>

                    {/* Amount Spent */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium text-right">
                      {formatCurrency(item.totalSpent)}
                    </td>

                    {/* Remaining (Conditional Highlighting) */}
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-right ${
                        isOverBudget ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {/* Show absolute value with a negative sign if over budget */}
                      {isOverBudget ? "-" : ""}
                      {formatCurrency(Math.abs(remaining))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-6 text-sm text-gray-500">
        **Note:** Negative remaining amounts are highlighted in red to clearly
        indicate categories that are **over budget**.
      </p>

      {/* --- Optional: Placeholder for a Chart --- */}
      <div className="mt-10 p-8 border border-dashed border-blue-200 bg-blue-50 rounded-lg text-center">
        <p className="font-semibold text-blue-700">Bar Chart Placeholder</p>
        <p className="text-sm text-blue-500">
          A simple bar chart showing Spent (blue) vs. Budget (gray line) for
          each category would go here, using a library like Recharts.
        </p>
      </div>
    </div>
  );
};

export default ReportPage;
