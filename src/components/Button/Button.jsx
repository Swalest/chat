import React from "react";

export const Button = ({ children, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      class="text-white flex items-center gap-2 bg-blue-700 hover:bg-blue-800 outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      {children}
    </button>
  );
};
