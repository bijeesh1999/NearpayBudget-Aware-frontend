import { AlertCircle } from "lucide-react";
import React from "react";

// Helper: Format Currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const ExpenseCard = ({ cat }) => {
  const isOverBudget = cat?.totalSpent > cat?.budget?.limitCents;
  const progressPercent = Math.min(
    (cat?.totalSpent / cat?.budget?.limitCents) * 100,
    100
  );
  const remaining =
    cat?.totalSpent >= cat?.budget?.limitCents
      ? 0
      : cat?.totalSpent - cat?.budget?.limitCents;

  return (
    <>
      {/* Card Top: Name & Color */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3">
          <div
            className={`w-4 h-4 rounded-full shadow-sm bg-[${cat?.color}]`}
          />
          <h3 className="font-semibold text-lg">{cat?.name}</h3>
        </div>

        {/* Over Budget Badge */}
        {isOverBudget && (
          <span className="flex items-center space-x-1 bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded border border-red-100">
            <AlertCircle size={12} />
            <span>OVER</span>
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-100 rounded-full h-3 mb-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isOverBudget ? "bg-red-500" : "bg-blue-500"
          }`}
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Financial Details */}
      <div className="flex justify-between items-end text-sm">
        <div>
          <p className="text-gray-500 text-xs mb-1">Spent / Limit</p>
          <p className="font-medium text-gray-900">
            {formatCurrency(cat?.totalSpent)}
            <span className="text-gray-400 mx-1">/</span>
            {formatCurrency(cat?.budget?.limitCents)}
          </p>
        </div>

        <div className="text-right">
          <p className="text-gray-500 text-xs mb-1">Remaining</p>
          <p
            className={`font-bold ${
              remaining < 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            {remaining < 0 ? "-" : ""}
            {formatCurrency(Math.abs(remaining))}
          </p>
        </div>
      </div>
    </>
  );
};
