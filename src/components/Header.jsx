import React, { memo, useCallback } from "react";
import { useAuth } from "../hooks/useAuth";
import { useUI } from "../hooks/useUI";
import ThemeToggle from "./ThemeToggle";

function Header() {
  const { user, logout } = useAuth();
  const { openNewListModal } = useUI();

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handleNewList = useCallback(() => {
    openNewListModal();
  }, [openNewListModal]);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-bold">Collab Todo</h1>

        {/* Optional – keep commented if you don’t want button */}
        {/* 
        <button
          onClick={handleNewList}
          className="px-3 py-1 bg-indigo-600 text-white rounded"
        >
          New List
        </button> 
        */}
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="flex items-center gap-2">
          <div className="text-sm">{user?.name}</div>
          <button
            onClick={handleLogout}
            className="text-xs text-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
