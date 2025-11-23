"use client";
import React, { useState, useMemo, useEffect } from "react";
import { ChevronUp, ChevronDown, Search, Filter } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { SearchField } from "./search";
import { FilterField } from "./filter";
import { tasksList } from "@/redux/slices/task.slice";
import TaskFormModal from "../components/form";

// Utility function for sorting

// --- DataTable Component ---

export default function DataTable() {
  // State for filtering and searching

  const dispatch = useDispatch();
  const [params, setParams] = React.useState({
    search: "",
    status: "",
    sort: {
      field: "name",
      direction: "asc",
    },
    skip: 0,
    limit: 10,
  });

  const { users, isLoading } = useSelector((state) => state.user);

  // Status options for the filter dropdown
  const statusOptions = [
    { label: "Active", value: "Active" },
    { label: "Pending", value: "Pending" },
    { label: "Inactive", value: "Inactive" },
  ];

  // useEffects

  React.useEffect(() => {

    dispatch(tasksList(params));
  }, [params]);

  // Logic to handle sorting when a header is clicked
  const handleSort = (field) => {
    let action = "asc";
    if (params.sort.field === field && params.sort.direction === "asc") {
      action = "desc";
    }
    setParams((prev) => ({
      ...prev,
      sort: {
        ...prev.sort,
        field,
        direction: action,
      },
    }));
  };

  //   Render the sort icon next to the header
  const renderSortIcon = (field) => {
    if (params.sort.field !== field) return null;
    return params.sort.direction === "asc" ? (
      <ChevronUp className="ml-2 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4" />
    );
  };

  //   Utility to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "text-green-700 bg-green-100 ring-green-600/20";
      case "Pending":
        return "text-yellow-700 bg-yellow-100 ring-yellow-600/20";
      case "Inactive":
        return "text-gray-600 bg-gray-50 ring-gray-500/10";
      default:
        return "text-gray-600 bg-gray-50 ring-gray-500/10";
    }
  };

  return (
    <>
      <div className="p-4 md:p-8 w-full mx-auto bg-gray-50 min-h-screen">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
            User Data Management
          </h2>
          <TaskFormModal />

          {/* --- Controls: Search & Filter --- */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
            <SearchField params={params} setParams={setParams} />

            <FilterField params={params} setParams={setParams} />
          </div>

          {/* --- Table --- */}
          <div className="overflow-x-auto border rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {/* 1. Name Header */}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center">
                      Name
                      {renderSortIcon("name")}
                    </div>
                  </th>
                  {/* 2. Email Header */}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  {/* 3. Created At Header */}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort("createdAt")}
                  >
                    <div className="flex items-center">
                      Created At
                      {renderSortIcon("createdAt")}
                    </div>
                  </th>
                  {/* 4. Status Header */}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.length > 0 ? (
                  users.map((item, index) => (
                    <tr
                      key={item?._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item?.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item?.createdAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${getStatusColor(
                            item?.status
                          )}`}
                        >
                          {item?.status || "--"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td
                        colSpan="4"
                        className="px-6 py-8 text-center text-gray-500 text-base"
                      >
                        No results found for your search criteria.
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* --- Pagination Controls --- */}
          {/* <div className="flex flex-col md:flex-row items-center justify-between mt-6 p-4 bg-gray-50 rounded-lg border">
          <div className="text-sm text-gray-600 mb-4 md:mb-0">
            Showing {totalItems === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(endIndex, totalItems)} of {totalItems} entries
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            Simple Page Indicator
            <span className="px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md border border-indigo-200">
              {currentPage} / {totalPages}
            </span>

            <Button
              variant="ghost"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </Button>
          </div>
        </div> */}
        </div>
      </div>
    </>
  );
}
