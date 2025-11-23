"use client";
import { logout } from "@/src/app/nearpay/redux/slices/user.slice";
import { useDispatch, useSelector } from "react-redux";
const { LogOut } = require("lucide-react");
import { useRouter, useParams } from "next/navigation"; // 🔑 Import useParams
import React from "react";

export const Logout = () => {
  // 🔑 Remove 'params' from props
  const dispatch = useDispatch();
  const router = useRouter();

  // 🔑 FIX: Use the useParams hook to access route parameters
  const params = useParams();

  const { status } = useSelector((state) => state.user);

  // 🔑 Now, 'params' will correctly log the route parameters (e.g., { id: '123' })

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      console.log("Logging out...");
      dispatch(logout());
    }
  };

  React.useEffect(() => {
    if (status === "logout") {
      window.history.replaceState(null, "", "/");
      router.push("/nearpay/login");
    }
  }, [status]);

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center justify-center p-3 text-gray-700 hover:bg-red-50 rounded-lg transition-colors group"
      title="Logout"
    >
      <LogOut size={20} className="text-red-500 group-hover:text-red-600" />
      {/* Optional: Add text label if the sidebar is expanded */}
      {/* {!isCollapsed && <span className="ml-3 font-medium text-red-500">Logout</span>} */}
    </button>
  );
};
