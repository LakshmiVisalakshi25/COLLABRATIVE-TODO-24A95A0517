import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useUI } from "../hooks/useUI";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { user, logout } = useAuth();
  const { setIsNewListOpen } = useUI();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-bold">Collab Todo</h1>
        {/* <button onClick={() => setIsNewListOpen(true)} className="px-3 py-1 bg-indigo-600 text-white rounded">New List</button> */}
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="flex items-center gap-2">
          <div className="text-sm">{user?.name}</div>
          <button onClick={logout} className="text-xs text-red-500">Logout</button>
        </div>
      </div>
    </header>
  );
}
