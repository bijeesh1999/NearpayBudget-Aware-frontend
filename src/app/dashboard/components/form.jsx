"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CreditCard, Calendar, TrendingUp, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  createNewExpense,
  resetStatus,
} from "@/src/redux/slices/expense.slice";
import { getOneCategory } from "@/src/redux/slices/category.slice";

// --- MOCK DATA & HELPERS ---
const INITIAL_CATEGORIES = [
  { id: 1, name: "Food & Dining", value: "Food & Dining" },
  { id: 2, name: "Transportation", value: "Transportation" },
  { id: 3, name: "Entertainment", value: "Entertainment" },
  { id: 4, name: "Utilities", value: "Utilities" },
];

const formatDate = (date) => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

// --- SIMULATED API CALL ---
const simulateApiSave = (values) => {
  return new Promise((resolve) => {
    // Simulate a network delay
    setTimeout(() => {
      // Logic to determine budget status (based on mock data)
      const status =
        values.amount > 500 || values.category === "Entertainment"
          ? "OVER_BUDGET"
          : "WITHIN_BUDGET";

      resolve({
        success: true,
        budgetStatus: status, // 'WITHIN_BUDGET' or 'OVER_BUDGET'
      });
    }, 800);
  });
};

// --- MAIN COMPONENT ---
export default function ExpenseForm({ onClose }) {
  const [toast, setToast] = useState(false); // { message: string, type: 'success' | 'error' }
  const [categoryId, setCategoryId] = React.useState(null);
  const [isSuccess, setSuccess] = React.useState(false);

  const { categories, category } = useSelector((state) => state.category);
  const singleStatus = useSelector((state) => state.category.status);

  const { status } = useSelector((state) => state.expenses);

  console.log({ category, singleStatus });

  const dispatch = useDispatch();

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    categoryId: Yup.string().required("Category is required."),
    amountCents: Yup.number()
      .required("Amount is required.")
      .min(0.01, "Amount must be greater than zero."),
    date: Yup.date().required("Date is required."),
  });

  // Initialize Formik hook
  const formik = useFormik({
    initialValues: {
      categoryId: "",
      amountCents: "",
      date: formatDate(new Date()), // Defaults to today
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // 1. Simulate API Save
      alert(JSON.stringify(values));
      setCategoryId(values.categoryId);
      dispatch(createNewExpense(values));
      // 3. Cleanup
      setSubmitting(false);
      resetForm({
        values: { ...formik.initialValues, date: formatDate(new Date()) },
      });
    },
  });

  console.log({ values: formik.values });

  // Determine toast appearance

  React.useEffect(() => {
    if (status === "created") {
      dispatch(getOneCategory({ id: categoryId }));
      dispatch(resetStatus());
    }
    if (singleStatus === "finded") {
      if (category?.totalSpent < category?.budget?.limitCents) {
        setToast({ message: "Within budget!", type: "success" });
        setSuccess(true);
      } else {
        setToast({ message: "Over budget!", type: "error" });
        setSuccess(false);
      }
      setTimeout(() => {
        onClose();
        setToast(false);
      }, 1000);
    }
  }, [status, singleStatus]);

  return (
    <>
      {/* --- Conditional Toast Message --- */}
      {toast && (
        <div
          className={`flex items-center justify-between p-4 mb-6 rounded-lg shadow-md transition-all duration-300
                        ${
                          isSuccess
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }
                    `}
          role="alert"
        >
          <div className="flex items-center space-x-3">
            {isSuccess ? <TrendingUp size={20} /> : <X size={20} />}
            <span className="font-semibold">{toast.message}</span>
          </div>
          <button
            onClick={() => setToast(false)}
            className="p-1 rounded-full hover:bg-white/20"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* --- Formik Form --- */}
      <form
        onSubmit={formik.handleSubmit}
        className="space-y-6 flex flex-col h-[100%]"
      >
        <div className="flex-1">
          {/* 1. Category Dropdown */}
          <div className="mb-5">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              name="categoryId"
              // 🔑 CORRECTED: Use Formik's built-in change handler to update the field value
              onChange={formik.handleChange}
              // 🔑 CORRECTED: Use Formik's built-in blur handler
              onBlur={formik.handleBlur}
              // 🔑 CORRECTED: Bind the selected value to formik.values.categoryId
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
              {/* 🔑 CORRECTED: Loop through categories and use _id as the saved value */}
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {formik.touched.categoryId && formik.errors.categoryId ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.categoryId}
              </div>
            ) : null}
          </div>

          {/* 2. Amount (Number) */}
          <div className="mb-5">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Amount ($)
            </label>
            <input
              id="amount"
              name="amountCents"
              type="number"
              step="0.01"
              min="0"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.amountCents}
              placeholder="e.g., 45.99"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.amountCents && formik.errors.amountCents
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.amountCents && formik.errors.amountCents ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.amountCents}
              </div>
            ) : null}
          </div>

          {/* 3. Date Picker (Defaults to today) */}
          <div className="mb-5">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date
            </label>
            <div className="relative">
              <input
                id="date"
                name="date"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.date}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                  formik.touched.date && formik.errors.date
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                // Set max date to today
                max={formatDate(new Date())}
              />
              <Calendar
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
            {formik.touched.date && formik.errors.date ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.date}
              </div>
            ) : null}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-20">
          <button
            type="button"
            className="w-full  text-gray py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:bg-blue-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {formik.isSubmitting ? "Saving..." : "Save Expense"}
          </button>
        </div>
      </form>
    </>
  );
}
