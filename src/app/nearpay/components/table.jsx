import React from "react";

export const Table = ({ children }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">{children}</table>
    </div>
  );
};
