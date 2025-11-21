"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createNewCategory, putOneCategory } from "@/src/redux/slices/category.slice";

// --- MOCK DATA & HELPERS ---
// Using hex codes for the input type="color"
const INITIAL_COLORS = {
  // We'll map the initial class colors to a starting hex for the picker
  "bg-blue-500": "#3b82f6",
  "bg-red-500": "#ef4444",
};

// --- MAIN COMPONENT ---
export default function CategoryForm({ category, setCategory }) {
  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Must be at least 3 characters.")
      .max(50, "Must be 50 characters or less.")
      .required("Category Name is required."),
    // Now validates a standard hex color string
    color: Yup.string().required("A color must be selected."),
  });

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.category);

  console.log({ isLoading });

  // Initialize Formik hook
  const formik = useFormik({
    initialValues: {
      name: category?.name || "",
      color: category?.color || INITIAL_COLORS["bg-blue-500"],
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (category?.id) {
        dispatch(putOneCategory({ id: category?.id, body: values }));
      } else {
        dispatch(createNewCategory(values));
      }

      // Simulate network delay
      setTimeout(() => {
        setSubmitting(false);
        resetForm();
      }, 800);
    },
  });


  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* 1. Category Name Input */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Category Name
        </label>
        <input
          id="categoryName"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          placeholder="e.g., Groceries or Travel"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
            formik.touched.name && formik.errors.name
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
        ) : null}
      </div>

      {/* 2. Color Picker INPUT */}
      <div>
        <label
          htmlFor="color"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select Color
        </label>
        <div className="flex items-center space-x-4">
          {/* The actual color picker input */}
          <input
            id="color"
            name="color"
            type="color" // <-- THIS IS THE KEY CHANGE
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.color}
            className="w-16 h-10 p-1 border border-gray-300 rounded-lg cursor-pointer"
          />
          {/* Display the selected hex code */}
          <span className="text-lg font-mono text-gray-700">
            {formik.values.color}
          </span>
        </div>

        {formik.touched.color && formik.errors.color ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.color}</div>
        ) : null}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !formik.isValid}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400"
      >
        {isLoading
          ? "Saving..."
          : category?.id
          ? "Update Category"
          : "Create Category"}
      </button>
    </form>
  );
}
