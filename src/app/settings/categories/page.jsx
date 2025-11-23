"use client";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/header";
import { AddCategory } from "./components/addCategory";
import { Table } from "../../components/table";
import { Pagination } from "../../components/pagination";
import Dialoge from "../../components/dialoge";
import CategoryForm from "./components/form";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteOneCategory,
  listCategory,
} from "@/src/redux/slices/category.slice";
import TableBodySkeleton from "../../reports/components/skeliton";

const CategoryTable = () => {
  const dispatch = useDispatch();

  // const [categories, setCategories] = useState(initialCategories);
  const [category, setCategory] = React.useState(null);
  let [isOpen, setIsOpen] = useState(false);
  const { status, categories, isLoading } = useSelector(
    (state) => state.category
  );

  const handleDelete = (categoryId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (confirmed) {
      dispatch(deleteOneCategory(categoryId));
    }
  };

  const handleEdit = (category) => {
    setCategory({
      id: category?._id,
      name: category?.name,
      color: category?.color,
    });
    setIsOpen(true);
  };

  const fetchCategory = () => {
    dispatch(listCategory(undefined));
  };

  const getProgressPercentage = (spent, budget) =>
    Math.min((spent / budget) * 100, 100);
  const isOverBudget = (spent, budget) => spent > budget;

  function closeModal() {
    setIsOpen(false);
    setCategory({});
  }

  function openModal() {
    setIsOpen(true);
  }

  React.useEffect(() => {
    if (["created", "updated", "deleted"].includes(status)) {
      closeModal();
      fetchCategory();
    }
  }, [status]);

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <Header>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Budget Categories
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage your budget categories and limits
          </p>
        </div>
        <AddCategory openModal={openModal} />
        <Dialoge isOpen={isOpen} closeModal={closeModal} title={"Category"}>
          <CategoryForm category={category} setCategory={setCategory} />
        </Dialoge>
      </Header>

      {/* Table */}
      <Table>
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input
                type="checkbox"
                onChange={() => {}}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center">Category Name</div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => handleSort("budget")}
            >
              <div className="flex items-center">Budget</div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Progress
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading ? (
            <TableBodySkeleton />
          ) : categories.length ? (
            categories.map((category, index) => {
              const progress = getProgressPercentage(
                category?.totalSpent || 0,
                category?.budget?.limitCents || 0
              );
              const overBudget = isOverBudget(
                category?.totalSpent || 0,
                category.budget?.limitCents
              );

              return (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={false}
                      onChange={() => {}}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: category.color }}
                      />
                      <div className="text-sm font-medium text-gray-900">
                        {category?.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {category?.budget?.limitCents
                        ? `$${category?.budget?.limitCents}`
                        : "NA"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${progress || 0}%`,
                            backgroundColor: category.color,
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-12">
                        {progress ? progress.toFixed(1) : 0}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {overBudget ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Over Budget
                      </span>
                    ) : !category?.budget ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        On Track
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        On Track
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        Edit
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <NoDataRow />
          )}
        </tbody>
      </Table>

      {/* Pagination Footer */}
      {/* <Pagination
        itemsPerPage={itemsPerPage}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={totalItems}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
      /> */}
    </div>
  );
};

export default CategoryTable;
