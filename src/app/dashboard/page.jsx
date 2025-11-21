"use client";
import React from "react";
import { Month } from "./components/dates";
import { AddExpense } from "./components/addExpense";
import { ExpenseCard } from "./components/card";
import { Header } from "../components/header";
import Drawer from "../components/drawer";
import ExpenseForm from "./components/form";
import { useDispatch, useSelector } from "react-redux";

// 1. Mock Data Generator
const INITIAL_DATA = [
  {
    id: 1,
    name: "Food & Dining",
    color: "bg-orange-500",
    spent: 450,
    limit: 600,
  },
  {
    id: 2,
    name: "Transportation",
    color: "bg-blue-500",
    spent: 120,
    limit: 200,
  },
  {
    id: 3,
    name: "Entertainment",
    color: "bg-purple-500",
    spent: 350,
    limit: 300,
  }, // Over budget
  { id: 4, name: "Shopping", color: "bg-pink-500", spent: 180, limit: 500 },
  { id: 5, name: "Utilities", color: "bg-green-500", spent: 295, limit: 300 }, // Warning territory
];

const Dashboard = () => {
  const categories = useSelector((state) => state.category.categories);
    const {status} = useSelector((state) => state.expenses);
  

  console.log({ categories });

  const [open, setIsOpen] = React.useState(false);

  const isOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };


  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
      {/* --- HEADER SECTION --- */}
      <Header>
        {/* Month Selector */}
        <div className="flex items-center space-x-4">
          <Month />
        </div>

        {/* Desktop "Add Expense" Button (Hidden on Mobile) */}
        <AddExpense isOpen={isOpen} />
        <Drawer isOpen={open} onClose={onClose} title={"Expense"}>
          <ExpenseForm onClose={onClose}/>
        </Drawer>
      </Header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-5xl mx-auto p-4 md:p-8 pb-24">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Budget Categories
        </h2>

        {/* Responsive Grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories?.map((cat) => {
            return (
              <div
                key={cat.id}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <ExpenseCard cat={cat} />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
