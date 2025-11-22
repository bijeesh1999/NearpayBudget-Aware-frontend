"use client";
import React, { useState } from "react";
import { Header } from "../components/header";
import { Month } from "../dashboard/components/dates";
import { useSelector } from "react-redux";


const ReportPage = () => {
  const { categories } = useSelector((state) => state.category);


  // Helper: Format Currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
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
              {categories?.map((item,index) => {
                const remaining = item?.totalSpent - item?.budget?.limitCents;
                const isOverBudget = remaining < 0;

                

                return (
                  <tr key={index} className="hover:bg-gray-50">
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
