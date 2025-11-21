import { Plus } from "lucide-react";
import react from "react";

export const AddCategory = ({ openModal }) => {
  return (
    <>
      <button
        onClick={() => openModal()}
        className="hidden md:flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-sm"
      >
        <Plus size={18} />
        <span>Add Category</span>
      </button>

      {/* --- MOBILE FAB (Floating Action Button) --- */}
      {/* Only visible on mobile/tablet (< md breakpoint) */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl shadow-blue-600/30 transition-transform active:scale-95 flex items-center justify-center"
        >
          <Plus size={24} strokeWidth={3} />
        </button>
      </div>
    </>
  );
};
