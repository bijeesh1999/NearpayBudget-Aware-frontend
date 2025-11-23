"use client";
import React from "react";
import { Month } from "./components/dates";
import { AddExpense } from "./components/addExpense";
import { ExpenseCard } from "./components/card";
import { Header } from "../components/header";
import Drawer from "../components/drawer";
import ExpenseForm from "./components/form";
import { useDispatch, useSelector } from "react-redux";
import { resetStatus } from "@/src/app/nearpay/redux/slices/user.slice";
import EmptyCard from "./components/empty";

const Dashboard = () => {
  const { categories, isLoading, statusCode } = useSelector(
    (state) => state.category
  );
  const { status } = useSelector((state) => state.expenses);

  console.log({ statusCode });

  const dispatch = useDispatch();

  console.log({ categories });

  const [open, setIsOpen] = React.useState(false);

  const isOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(resetStatus());
    }, 50);
  }, []);

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
          <ExpenseForm onClose={onClose} />
        </Drawer>
      </Header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-5xl mx-auto p-4 md:p-8 pb-24">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Budget Categories
        </h2>
        {isLoading ? (
          <EmptyCard loading={isLoading} />
        ) : categories?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories?.map((cat, index) => {
              return (
                <div
                  key={index}
                  className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden"
                >
                  <ExpenseCard cat={cat} />
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyCard loading={false} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
