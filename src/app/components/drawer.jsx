import React from 'react';
import { X } from 'lucide-react';

const Drawer = ({ isOpen, onClose, title, children }) => {
    return (
        // 1. Wrapper: Controls visibility so it doesn't block clicks when closed
        <div
            className={`fixed inset-0 z-50 flex justify-end ${isOpen ? 'visible' : 'invisible'}`}
        >

            {/* 2. Backdrop: Fades in/out. Clicking it closes the drawer. */}
            <div
                className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                onClick={onClose}
            />

            {/* 3. The Drawer Panel: Slides in from right */}
            <div
                className={`relative z-50 w-full md:w-96 h-full bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">{title || 'Panel'}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-4">
                    {children}
                </div>

                {/* Optional: Footer area */}
                {/* <div className="p-4 border-t border-gray-200">Footer Actions</div> */}

            </div>
        </div>
    );
};

export default Drawer;