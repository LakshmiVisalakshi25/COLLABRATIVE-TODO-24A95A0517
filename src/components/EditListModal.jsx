// src/components/EditListModal.jsx
import { useState } from "react";
import { useTodos } from "../contexts/TodosContext";

export default function EditListModal({ list, closeModal }) {
  const { updateList } = useTodos();
  const [name, setName] = useState(list.title);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    updateList(list.id, { title: name.trim() });
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Edit List Name
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 rounded-xl border text-gray-700 dark:text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
