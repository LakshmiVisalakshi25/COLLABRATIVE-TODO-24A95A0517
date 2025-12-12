import React from "react";
import { useUI } from "../contexts/UIContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useUI();

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white"
    >
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}
