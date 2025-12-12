import React, { useState } from "react";
import { useUI } from "../contexts/UIContext";
import { useTodos } from "../contexts/TodosContext";

export default function NewListModal() {
  const { closeNewListModal } = useUI();
  const { addList } = useTodos();
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addList(title.trim());
    setTitle("");
    closeNewListModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-80 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Create New List</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="List title"
            className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={closeNewListModal} className="px-3 py-1 rounded bg-gray-400 hover:bg-gray-500 text-white">Cancel</button>
            <button type="submit" className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
