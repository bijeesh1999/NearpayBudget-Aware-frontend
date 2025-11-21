"use client";

import React, { useState, useCallback } from "react";
import { Trash2, Save, Wallet, Loader2, Edit, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Month } from "./components/date";
import { deleteOneBudget, putOneBudget } from "@/src/redux/slices/budget.slice";
import NewBudgetForm from "./components/form";
import Drawer from "../../components/drawer";
import { Header } from "../../components/header";
import { listUserCategory } from "@/src/redux/slices/category.slice";

// =======================================================
// 🛠️ HELPER FUNCTIONS
// =======================================================

/**
 * Converts limitCents to formatted dollars (e.g., 12500 -> 125.00)
 * @param {number} cents
 * @returns {string} Formatted dollar string
 */
const formatCentsToDollars = (cents) => (cents / 100).toFixed(2);

// =======================================================
// ⚛️ MAIN COMPONENT
// =======================================================

export default function BudgetManager() {
  const dispatch = useDispatch(); // Get categories (including budget data) from Redux
  const { categories, status } = useSelector((state) => state.category) || [];
  const [isOpen, setIsOpen] = React.useState(false);

  const [editingId, setEditingId] = useState(null); // State to hold the current value of the temporary input field
  const [editValue, setEditValue] = useState(""); // State to track saving status for the current editing item
  const [isSaving, setIsSaving] = useState(false); // ---------------------------------------------------- // HANDLERS // ----------------------------------------------------
  /**
   * Opens the edit input for a category and pre-fills the current budget limit.
   * @param {string} categoryId
   */

  const handleEditClick = useCallback(
    (categoryId) => {
      console.log({ categoryId });

      const category = categories.find((c) => c._id === categoryId);
      const currentCents = category?.budget?.limitCents || 0; // Initialize the edit value with the current budget
      setEditValue(formatCentsToDollars(currentCents));
      setEditingId(categoryId);
    },
    [categories]
  );
  /**
   * Closes the edit input without saving changes.
   */
  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    setEditValue("");
  }, []);
  /**
   * Handles saving the updated budget limit for a single category.
   * This is now explicitly called by the Save button.
   * @param {string} categoryId
   */

  const handleSave = useCallback(
    async (categoryId) => {
      const limitDollars = parseFloat(editValue); // Basic validation

      if (isNaN(limitDollars) || limitDollars < 0) {
        alert("Please enter a valid non-negative number.");
        return;
      }

      setIsSaving(true); // 🔑 Action 1: Construct the single payload objec

      try {
        // 🔑 Action 2: Dispatch the renamed action putOneBudget
        await dispatch(
          putOneBudget({
            id: categoryId,
            limitCents: Math.round(limitDollars * 100),
          })
        ).unwrap(); // Success: close the edit input
        {
          categoryId, Math.round(limitDollars * 100);
        }
        setEditingId(null);
        console.log(`Budget for ${categoryId} updated.`);
      } catch (error) {
        console.error("Update failed:", error);
        alert("Failed to save budget. Please check server logs.");
      } finally {
        setIsSaving(false);
      }
    },
    [dispatch, editValue]
  );
  /**
   * Handles deleting a budget limit (setting it to 0).
   * @param {string} categoryId
   */

  const handleDelete = useCallback(
    async (categoryId) => {
      const confirm = window.confirm(
        `Are you sure you want to delete the budget ?`
      );
      console.log({ confirm });

      if (confirm) {
        await dispatch(
          deleteOneBudget({
            id: categoryId,
          })
        );
      }
    },
    [dispatch]
  );

  const open = () => {
    setIsOpen(true);
    dispatch(listUserCategory());
  };

  const close = () => {
    setIsOpen(false);
  };

  // ---------------------------------------------------- // RENDER // ----------------------------------------------------

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <Header>
        <Month close={close} />
        <button
          className="cursore-pointer bg-blue text-black cursore-pointer"
          onClick={() => open()}
        >
          Add Budget
        </button>
      </Header>
      <div className="bg-white shadow-xl rounded-xl p-6 mt-6">
        {" "}
        <p className="text-sm font-semibold text-gray-500 mb-4">
          Current Monthly Limits:{" "}
        </p>{" "}
        <div className="space-y-4">
          {" "}
          {categories.map((category) => {
            const isEditing = editingId === category._id;
            const currentCents = category?.budget?.limitCents || 0;
            const currentLimitDisplay = formatCentsToDollars(currentCents);

            return (
              <div
                key={category._id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border-b sm:border-b-0 last:border-b-0 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {/* Category Name */}{" "}
                <div className="flex items-center space-x-3 w-full sm:w-1/3 mb-2 sm:mb-0">
                  {" "}
                  <div
                    className={`w-3 h-3 rounded-full ${
                      category.color || "bg-gray-400"
                    } shrink-0`}
                  ></div>{" "}
                  <span className="font-medium text-gray-800">
                    {category.name}
                  </span>{" "}
                </div>
                {/* Limit Display / Edit Input */}{" "}
                <div className="flex items-center space-x-3 w-full sm:w-2/3">
                  {" "}
                  <div className="relative flex-grow">
                    {" "}
                    {isEditing ? (
                      // EDIT INPUT FIELD
                      <>
                        {" "}
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
                          $
                        </span>{" "}
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)} // 🚨 IMPORTANT: Removed onBlur and onKeyDown save events
                          className={`w-full pl-6 pr-10 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 text-right font-mono ${
                            isSaving ? "bg-gray-100" : "bg-white"
                          }`}
                          disabled={isSaving}
                          autoFocus
                        />{" "}
                      </>
                    ) : (
                      // DISPLAY MODE
                      <span
                        className={`text-lg font-mono text-right w-full block ${
                          currentCents > 0 ? "text-gray-800" : "text-gray-400"
                        }`}
                      >
                        {" "}
                        {currentCents > 0
                          ? `$${currentLimitDisplay}`
                          : "No Limit Set"}{" "}
                      </span>
                    )}{" "}
                  </div>
                  {/* Action Buttons */}{" "}
                  {isSaving ? (
                    <div className="w-20 flex justify-end">
                      {" "}
                      <Loader2
                        size={20}
                        className="animate-spin text-blue-600"
                      />{" "}
                    </div>
                  ) : isEditing ? (
                    // Buttons shown when editing
                    <div className="flex space-x-2">
                      {/* 🔑 NEW: Explicit Save Button */}{" "}
                      <button
                        type="button"
                        onClick={() => handleSave(category.budget?._id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors shrink-0"
                        title="Save Budget"
                      >
                        <Save size={20} />{" "}
                      </button>{" "}
                      {/* Cancel Button */}{" "}
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors shrink-0"
                        title="Cancel Edit"
                      >
                        <X size={20} />{" "}
                      </button>{" "}
                    </div>
                  ) : (
                    // Buttons shown when in display mode
                    <div className="flex space-x-2">
                      {/* EDIT BUTTON */}{" "}
                      <button
                        type="button"
                        onClick={() => handleEditClick(category._id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors shrink-0"
                        title="Edit Limit"
                      >
                        <Edit size={20} />{" "}
                      </button>{" "}
                      {/* DELETE/CLEAR BUTTON (only visible if limit is set) */}{" "}
                      {currentCents > 0 && (
                        <button
                          type="button"
                          onClick={() => handleDelete(category.budget?._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors shrink-0"
                          title="Clear Budget"
                        >
                          <Trash2 size={20} />{" "}
                        </button>
                      )}{" "}
                    </div>
                  )}{" "}
                </div>{" "}
              </div>
            );
          })}{" "}
        </div>{" "}
      </div>{" "}
      <Drawer isOpen={isOpen} onClose={close} title="Budget">
        <NewBudgetForm close={close} />
      </Drawer>
    </div>
  );
}
