import React from "react";
import { useUI } from "../contexts/UIContext";
import { useTodos } from "../contexts/TodosContext";
import { useActivities } from "../contexts/ActivitiesContext";

export default function TodoListCard({ list }) {
  const { theme } = useUI();
  const { lists, setLists } = useTodos();
  const { addActivity } = useActivities();

  const cardBg = theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300";
  const headingColor = theme === "dark" ? "text-white" : "text-gray-900";
  const subTextColor = theme === "dark" ? "text-gray-300" : "text-gray-700";

  // ----- LIST -----
  const handleEditListName = () => {
    const newName = prompt("Enter new list name:", list.title);
    if (newName && newName.trim() !== "" && newName !== list.title) {
      const oldName = list.title;
      setLists(lists.map(l => l.id === list.id ? { ...l, title: newName.trim() } : l));
      addActivity(`List "${oldName}" was renamed to "${newName.trim()}"`);
    }
  };

  const handleDeleteList = () => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      setLists(lists.filter(l => l.id !== list.id));
      addActivity(`List "${list.title}" was deleted`);
    }
  };

  const handleAddTask = () => {
    const taskName = prompt("Enter task name:");
    if (!taskName || taskName.trim() === "") return;

    const newTask = { id: Date.now(), name: taskName.trim(), subtasks: [] };
    setLists(lists.map(l => l.id === list.id ? { ...l, tasks: [...(l.tasks || []), newTask] } : l));
    addActivity(`Task "${taskName.trim()}" added to list "${list.title}"`);
  };

  // ----- TASK -----
  const handleEditTask = (taskId) => {
    const task = list.tasks.find(t => t.id === taskId);
    const newName = prompt("Edit task name:", task.name);
    if (newName && newName.trim() !== "" && newName !== task.name) {
      setLists(lists.map(l => l.id === list.id
        ? { ...l, tasks: l.tasks.map(t => t.id === taskId ? { ...t, name: newName.trim() } : t) }
        : l
      ));
      addActivity(`Task "${task.name}" in list "${list.title}" was renamed to "${newName.trim()}"`);
    }
  };

  const handleDeleteTask = (taskId) => {
    const task = list.tasks.find(t => t.id === taskId);
    setLists(lists.map(l => l.id === list.id
      ? { ...l, tasks: l.tasks.filter(t => t.id !== taskId) }
      : l
    ));
    addActivity(`Task "${task.name}" in list "${list.title}" was deleted`);
  };

  const handleAddSubtask = (taskId) => {
    const subtaskName = prompt("Enter subtask name:");
    if (!subtaskName || subtaskName.trim() === "") return;

    setLists(lists.map(l => l.id === list.id
      ? {
          ...l,
          tasks: l.tasks.map(t =>
            t.id === taskId
              ? { ...t, subtasks: [...(t.subtasks || []), { id: Date.now(), name: subtaskName.trim() }] }
              : t
          )
        }
      : l
    ));
    const taskName = list.tasks.find(t => t.id === taskId).name;
    addActivity(`Subtask "${subtaskName.trim()}" added to task "${taskName}" in list "${list.title}"`);
  };

  const handleEditSubtask = (taskId, subtaskId) => {
    const task = list.tasks.find(t => t.id === taskId);
    const subtask = task.subtasks.find(s => s.id === subtaskId);
    const newName = prompt("Edit subtask name:", subtask.name);
    if (newName && newName.trim() !== "" && newName !== subtask.name) {
      setLists(lists.map(l => l.id === list.id
        ? {
            ...l,
            tasks: l.tasks.map(t => t.id === taskId
              ? { ...t, subtasks: t.subtasks.map(s => s.id === subtaskId ? { ...s, name: newName.trim() } : s) }
              : t
            )
          }
        : l
      ));
      addActivity(`Subtask "${subtask.name}" in task "${task.name}" was renamed to "${newName.trim()}"`);
    }
  };

  const handleDeleteSubtask = (taskId, subtaskId) => {
    const task = list.tasks.find(t => t.id === taskId);
    const subtask = task.subtasks.find(s => s.id === subtaskId);
    setLists(lists.map(l => l.id === list.id
      ? {
          ...l,
          tasks: l.tasks.map(t => t.id === taskId
            ? { ...t, subtasks: t.subtasks.filter(s => s.id !== subtaskId) }
            : t
          )
        }
      : l
    ));
    addActivity(`Subtask "${subtask.name}" in task "${task.name}" was deleted`);
  };

  return (
    <div className={`rounded-xl border shadow-sm p-4 transition-colors duration-500 ${cardBg}`}>
      {/* List Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className={`text-lg font-semibold ${headingColor}`}>{list.title}</h3>
        <div className="flex gap-2">
          <button onClick={handleEditListName} className="px-3 py-1 text-white rounded-md bg-blue-500 hover:bg-blue-600">Edit</button>
          <button onClick={handleDeleteList} className="px-3 py-1 text-white rounded-md bg-red-500 hover:bg-red-600">Delete</button>
          <button onClick={handleAddTask} className="px-3 py-1 text-white rounded-md bg-green-500 hover:bg-green-600 text-sm">+ Task</button>
        </div>
      </div>

      {/* Tasks */}
      {list.tasks && list.tasks.length > 0 ? (
        <ul className="space-y-2">
          {list.tasks.map(task => (
            <li key={task.id} className={`p-2 rounded-md ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
              <div className="flex justify-between items-center mb-1">
                <span className={`${subTextColor}`}>{task.name}</span>
                <div className="flex gap-2">
                  <button onClick={() => handleAddSubtask(task.id)} className="px-2 py-1 text-white rounded bg-green-500 hover:bg-green-600 text-sm">+ Subtask</button>
                  <button onClick={() => handleEditTask(task.id)} className="px-2 py-1 text-white rounded bg-blue-500 hover:bg-blue-600 text-sm">Edit</button>
                  <button onClick={() => handleDeleteTask(task.id)} className="px-2 py-1 text-white rounded bg-red-500 hover:bg-red-600 text-sm">Delete</button>
                </div>
              </div>

              {/* Subtasks */}
              {task.subtasks && task.subtasks.length > 0 && (
                <ul className="ml-4 mt-2 space-y-1">
                  {task.subtasks.map(sub => (
                    <li key={sub.id} className="flex justify-between items-center">
                      <span className={`${subTextColor} text-sm`}>{sub.name}</span>
                      <div className="flex gap-1">
                        <button onClick={() => handleEditSubtask(task.id, sub.id)} className="px-2 py-0.5 text-white rounded bg-blue-500 hover:bg-blue-600 text-xs">Edit</button>
                        <button onClick={() => handleDeleteSubtask(task.id, sub.id)} className="px-2 py-0.5 text-white rounded bg-red-500 hover:bg-red-600 text-xs">Delete</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className={`text-sm ${subTextColor} text-center py-2`}>No tasks added yet.</p>
      )}
    </div>
  );
}
