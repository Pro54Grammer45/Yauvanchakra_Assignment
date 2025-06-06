"use client";
import React from "react";
import spinnerLoadingImage from "@/assets/img/spinner.gif";

interface CMButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const CMButton: React.FC<CMButtonProps> = ({ type = "button", onClick, className = "", disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${className} opacity-50 cursor-not-allowed text-white text-sm h-12 font-semibold align-bottom inline-flex items-center justify-center leading-5 transition-colors duration-150 focus:outline-none`}
    >
      <img src={spinnerLoadingImage.src} alt="Loading" width={20} height={10} />
      <span className="font-serif ml-1 font-light text-sm text-white">
        Processing
      </span>
    </button>
  );
};

export default CMButton;