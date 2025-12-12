import React from "react";
import Header from "../components/Header";
import NewListModal from "../components/NewListModal";
import TodoListCard from "../components/TodoListCard";
import ActivityLog from "../components/ActivityLog";
import ThemeToggle from "../components/ThemeToggle";
import { useTodos } from "../contexts/TodosContext";
import { useUI } from "../contexts/UIContext";

export default function DashboardPage() {
  const { lists } = useTodos();
  const { isNewListOpen, openNewListModal, theme } = useUI();

  const pageBg = theme === "dark" ? "bg-gray-900" : "bg-gray-50";
  const cardBg = theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300";
  const headingColor = theme === "dark" ? "text-white" : "text-gray-900";
  const subTextColor = theme === "dark" ? "text-gray-300" : "text-gray-700";

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 ${pageBg}`}>
      <Header />
      <div className="w-full flex flex-col md:flex-row gap-8 p-8">
        <div className="flex-1">
          <div className={`rounded-xl shadow-lg border ${cardBg} transition-colors duration-500 p-6`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${headingColor}`}>Todo Dashboard</h2>
              <div className="flex gap-4">
                <ThemeToggle />
                <button
                  onClick={openNewListModal}
                  className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-md font-semibold transition-all duration-300"
                >
                  + New List
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {lists.length > 0 ? (
                lists.map(list => <TodoListCard key={list.id} list={list} />)
              ) : (
                <div className={`p-6 rounded-lg border ${cardBg} opacity-95 text-center ${subTextColor}`}>
                  No tasks yet. Add a new list!
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className={`p-6 rounded-xl shadow-lg border ${cardBg} min-h-[220px] transition-colors duration-500`}>
            <h3 className={`text-xl font-semibold mb-4 ${headingColor}`}>Activity</h3>
            <ActivityLog />
          </div>
        </div>
      </div>
      {isNewListOpen && <NewListModal />}
    </div>
  );
}
