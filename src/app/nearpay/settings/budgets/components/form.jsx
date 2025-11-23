"use client";

import React, { useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Save, DollarSign } from "lucide-react";

// ⚠️ ASSUMPTION: Replace with your actual Redux action
import { createNewBudget } from "@/src/app/nearpay/redux/slices/budget.slice";

// =======================================================
// 🛠️ VALIDATION SCHEMA
// =======================================================

const validationSchema = Yup.object({
  month: Yup.string()
    .required("Month is required")
    .matches(/^\d{4}-\d{2}$/, "Month must be in YYYY-MM format"),

  categoryId: Yup.string().required("Category is required"),

  // We validate the input as a dollar amount (float)
  limitDollars: Yup.number()
    .required("Budget limit is required")
    .min(0.01, "Limit must be greater than zero")
    .typeError("Must be a valid number"),
});

// =======================================================
// ⚛️ MAIN FORM COMPONENT
// =======================================================

export default function NewBudgetForm() {
  const dispatch = useDispatch();

  // 🔑 Fetch categories from Redux state for the dropdown
  const { userCategories, categories } =
    useSelector((state) => state.category) || [];

  // Function to get the current month in YYYY-MM format for initial value
  const getCurrentMonth = () => {
    const now = new Date();
    // Use Intl.DateTimeFormat for reliable formatting
    return new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
    }).format(now);
  };

  const formik = useFormik({
    initialValues: {
      month: getCurrentMonth(),
      categoryId: "",
      // We use limitDollars for the input field for user convenience
      limitDollars: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      // 🔑 CONVERSION: Convert limitDollars (float) to limitCents (integer)
      const limitCents = Math.round(parseFloat(values.limitDollars) * 100);

      const payload = {
        month: values.month,
        categoryId: values.categoryId,
        limitCents: limitCents,
        // userId: // Include user ID if necessary
      };

      try {
        // 🔑 DISPATCH: Call the Redux action with the final payload
        await dispatch(createNewBudget(payload)).unwrap();
        resetForm(); // Reset form on success
      } catch (error) {
        console.error("Budget creation failed:", error);
        alert(`Failed to create budget: ${error.message || "Server error"}`);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const excludedIds = useMemo(() => {
    // Map the existing budgets to get an array of only the category IDs
    const idsToExclude = categories.map((category) => category._id);
    // Create a Set for O(1) lookup time (fastest way to check for inclusion)
    return new Set(idsToExclude);
  }, [categories]);

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col">
      <div className="flex-1">
        {/* --- 1. MONTH FIELD (YYYY-MM) --- */}
        <div className="mb-5">
          <label
            htmlFor="month"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Month (YYYY-MM)
          </label>
          <input
            id="month"
            name="month"
            type="text" // Using text to allow for YYYY-MM format input
            placeholder="e.g. 2025-07"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.month}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
              formik.touched.month && formik.errors.month
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.month && formik.errors.month ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.month}
            </div>
          ) : null}
        </div>

        {/* --- 2. CATEGORY FIELD (ID) --- */}
        <div className="mb-5">
          <label
            htmlFor="categoryId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            id="categoryId"
            name="categoryId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.categoryId}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
              formik.touched.categoryId && formik.errors.categoryId
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            <option value="" disabled>
              Select a category
            </option>
            {userCategories // 🔑 STEP 1: Filter the array
              .filter((cat) => {
                // FIX: Check if the category's _id is NOT present in the Set of excluded IDs.
                // If excludedIds.has(cat._id) is TRUE, the filter returns FALSE, excluding the category.
                return !excludedIds.has(cat._id);
              }) // 🔑 STEP 2: Map the filtered array
              ?.map(
                (
                  cat // Value saves the ObjectId, label shows the name
                ) => (
                  <option key={cat._id} value={cat._id}>
                                    {cat.name}             {" "}
                  </option>
                )
              )}
          </select>
          {formik.touched.categoryId && formik.errors.categoryId ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.categoryId}
            </div>
          ) : null}
        </div>

        {/* --- 3. LIMIT FIELD (DOLLARS) --- */}
        <div className="mb-6">
          <label
            htmlFor="limitDollars"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Budget Limit ($)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              $
            </span>
            <input
              id="limitDollars"
              name="limitDollars"
              type="number"
              min="0.01"
              step="0.01"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.limitDollars}
              className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 text-right font-mono ${
                formik.touched.limitDollars && formik.errors.limitDollars
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="0.00"
            />
          </div>
          {formik.touched.limitDollars && formik.errors.limitDollars ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.limitDollars}
            </div>
          ) : null}
        </div>
      </div>

      {/* --- SUBMIT BUTTON --- */}
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {formik.isSubmitting ? (
          <>
            <Save size={18} className="animate-spin mr-2" />
            Creating...
          </>
        ) : (
          <>
            <Save size={18} className="mr-2" />
            Create Budget
          </>
        )}
      </button>
    </form>
  );
}
