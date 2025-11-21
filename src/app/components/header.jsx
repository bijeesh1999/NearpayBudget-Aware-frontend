import React from "react";

export const Header = ({ children }) => {
    return (
        <header className="w-[100%] bg-white border-b border-gray-200 px-10 py-3 md:px-8 fixed top-0 left-0 z-4">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
                {children}
            </div>
        </header>
    )
}