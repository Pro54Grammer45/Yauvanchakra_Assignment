"use client";
import React from "react";

interface ActiveButtonProps {
  tapValue: string;
  activeValue: string;
  handleProductTap: (activeValue: string, isScroll: boolean, tapValue: string) => void;
}

const ActiveButton: React.FC<ActiveButtonProps> = ({ tapValue, activeValue, handleProductTap }) => {
  return (
    <button
      className={`inline-block px-4 py-2 text-base ${
        tapValue === activeValue &&
        "text-emerald-600 border-emerald-600 dark:text-emerald-500 dark:border-emerald-500 rounded-t-lg border-b-2"
      } focus:outline-none`}
      aria-current="page"
      onClick={() => handleProductTap(activeValue, false, tapValue)}
    >
      {activeValue}
    </button>
  );
};

export default ActiveButton;