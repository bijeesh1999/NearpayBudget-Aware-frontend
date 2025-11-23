"use client";
import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Settings,
  PieChart,
  Wallet,
  List,
  Menu,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
} from "lucide-react";
// 1. Import Link
import Link from "next/link";
import { usePathname, useParams, useRouter } from "next/navigation"; // Use usePathname to determine active link
import { Logout } from "./logout";
import { useSelector } from "react-redux";

export const Sidebar = ({ children }) => {
  const pathname = usePathname(); // Get current URL path
  const params = useParams(); // Get current URL path

  const { statusCode } = useSelector((state) => state.category);

  const router = useRouter();

  // State for Desktop Sidebar (Expanded/Collapsed)
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isPath, setIsPath] = useState(true);

  // State for Mobile Drawer (Open/Closed)
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // State for Settings Submenu
  // Determine initial state based on current path for a better UX
  const [isSettingsOpen, setIsSettingsOpen] = useState(
    pathname.includes("settings") || true
  );

  // Close mobile menu when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 1. The Navigation Item Component (Now uses Link and current URL)
  const NavItem = ({ href, icon: Icon, label, isSubItem = false, onClick }) => {
    // Determine active state based on the current URL pathname
    const isActive =
      pathname === href || (href === "/dashboard" && pathname === "/");

    // If collapsed (desktop) and it's a sub-item, don't show it
    if (isCollapsed && isSubItem) return null;

    return (
      // 2. Use Link component
      <Link
        href={href}
        onClick={onClick}
        className={`
          w-full flex items-center p-3 transition-colors duration-200 relative
          ${isSubItem ? "pl-11 text-sm" : ""}
          ${
            isActive
              ? "bg-blue-50 text-blue-700"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }
        `}
      >
        {/* Active Indicator Strip */}
        {isActive && !isSubItem && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r" />
        )}

        <Icon size={isSubItem ? 18 : 22} strokeWidth={isSubItem ? 2 : 2} />

        {/* Text Label - Hidden when collapsed on Desktop */}
        <span
          className={`ml-3 font-medium whitespace-nowrap transition-opacity duration-200 ${
            isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
          }`}
        >
          {label}
        </span>
      </Link>
    );
  };

  // 2. The Sidebar Content
  const SidebarContent = () => (
    // Added top-0 to fix position in mobile view
    <div className="flex flex-col h-screen bg-white border-r border-gray-200">
      {/* Logo / Header Area */}
      <div
        className={`h-16 flex items-center ${
          isCollapsed ? "justify-center" : "px-6"
        } border-b border-gray-100`}
      >
        {/* Wrap Logo in Link to go to Dashboard */}
        <Link href="/dashboard" className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shrink-0">
            F
          </div>
          <span
            className={`ml-3 text-xl font-bold text-gray-800 transition-all duration-300 overflow-hidden whitespace-nowrap ${
              isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            }`}
          >
            FinanceApp
          </span>
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
        <NavItem
          href="/nearpay/dashboard" // Changed id to href
          icon={LayoutDashboard}
          label="Dashboard"
          onClick={() => {
            if (window.innerWidth < 768) setIsMobileOpen(false);
          }} // Close mobile on click
        />
        <NavItem
          href="/nearpay/reports" // Changed id to href
          icon={PieChart}
          label="Reports"
          onClick={() => {
            if (window.innerWidth < 768) setIsMobileOpen(false);
          }}
        />

        {/* Settings Group */}
        <div className="mt-2">
          <button
            onClick={() => {
              if (isCollapsed) setIsCollapsed(false); // Auto-expand if clicked while collapsed
              setIsSettingsOpen(!isSettingsOpen);
            }}
            className={`w-full flex items-center justify-between p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors
              ${pathname.includes("settings") ? "text-blue-700" : ""}
            `}
          >
            <div className="flex items-center">
              <Settings size={22} />
              <span
                className={`ml-3 font-medium whitespace-nowrap transition-opacity duration-200 ${
                  isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                }`}
              >
                Settings
              </span>
            </div>
            {/* Chevron only shows if NOT collapsed */}
            {!isCollapsed && (
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  isSettingsOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </button>

          {/* Nested Items */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isSettingsOpen && !isCollapsed ? "max-h-40" : "max-h-0"
            }`}
          >
            <NavItem
              href="/nearpay/settings/categories" // Changed id to href
              icon={List}
              label="Categories"
              isSubItem
              onClick={() => {
                if (window.innerWidth < 768) setIsMobileOpen(false);
              }}
            />
            <NavItem
              href="/nearpay/settings/budgets" // Changed id to href
              icon={Wallet}
              label="Budgets"
              isSubItem
              onClick={() => {
                if (window.innerWidth < 768) setIsMobileOpen(false);
              }}
            />
          </div>
        </div>
      </nav>

      {/* Footer / Collapse Toggle (Desktop Only) */}
      <Logout />
    </div>
  );

  React.useEffect(() => {
    if (pathname === "/nearpay/login" || pathname === "/nearpay/signUp") {
      setIsPath(false);
    } else {
      setIsPath(true);
    }
  }, [pathname]);

  React.useEffect(() => {
    if (statusCode === 401) {
      router.push("/nearpay/login");
    }
  }, [statusCode]);

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* --- MOBILE HEADER (Visible only on small screens) --- */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30 flex items-center px-4 justify-between">
        {isPath && (
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              <Menu size={24} />
            </button>
            <span className="ml-3 font-bold text-lg text-gray-800">
              FinanceApp
            </span>
          </div>
        )}
      </header>

      {/* --- SIDEBAR (DESKTOP) --- */}
      {isPath && (
        <aside
          className={`
          hidden md:block h-screen bg-white border-r border-gray-200
          transition-all duration-300 ease-in-out fixed top-0 left-0 z-10
          ${isCollapsed ? "w-20" : "w-64"}
        `}
        >
          <SidebarContent />
        </aside>
      )}

      {/* --- SIDEBAR (MOBILE DRAWER) --- */}
      {/* Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Drawer Panel */}
      {isPath && (
        <div
          className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out md:hidden
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}
        >
          {/* Close Button for Mobile */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-1 text-gray-500 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>
          </div>
          <SidebarContent />
        </div>
      )}

      <div className="flex items-center justify-center w-full h-full pt-30">
        {children}
      </div>
    </div>
  );
};
