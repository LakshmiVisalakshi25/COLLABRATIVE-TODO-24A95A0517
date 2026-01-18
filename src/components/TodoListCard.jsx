import React, { memo, useCallback } from "react";
import { useUI } from "../contexts/UIContext";
import { useTodos } from "../contexts/TodosContext";

function TodoListCard({ list }) {
  const { theme } = useUI();
  const {
    editList,
    deleteList,
    addTask,
    editTask,
    deleteTask,
    addSubtask,
    editSubtask,
    deleteSubtask
  } = useTodos();

  const cardBg =
    theme === "dark"
      ? "bg-gray-800 border-gray-700"
      : "bg-white border-gray-300";
  const headingColor =
    theme === "dark" ? "text-white" : "text-gray-900";
  const subTextColor =
    theme === "dark" ? "text-gray-300" : "text-gray-700";

  /* -------- LIST -------- */
  const handleEditListName = useCallback(() => {
    const newName = prompt("Enter new list name:", list.title);
    if (newName && newName.trim() && newName !== list.title) {
      editList(list.id, newName.trim());
    }
  }, [editList, list.id, list.title]);

  const handleDeleteList = useCallback(() => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      deleteList(list.id);
    }
  }, [deleteList, list.id]);

  const handleAddTask = useCallback(() => {
    const taskName = prompt("Enter task name:");
    if (taskName && taskName.trim()) {
      addTask(list.id, taskName.trim());
    }
  }, [addTask, list.id]);

  /* -------- TASK -------- */
  const handleEditTask = useCallback(
    (taskId, oldName) => {
      const newName = prompt("Edit task name:", oldName);
      if (newName && newName.trim() && newName !== oldName) {
        editTask(list.id, taskId, newName.trim());
      }
    },
    [editTask, list.id]
  );

  const handleDeleteTask = useCallback(
    (taskId) => {
      deleteTask(list.id, taskId);
    },
    [deleteTask, list.id]
  );

  /* -------- SUBTASK -------- */
  const handleAddSubtask = useCallback(
    (taskId) => {
      const subtaskName = prompt("Enter subtask name:");
      if (subtaskName && subtaskName.trim()) {
        addSubtask(list.id, taskId, subtaskName.trim());
      }
    },
    [addSubtask, list.id]
  );

  const handleEditSubtask = useCallback(
    (taskId, subtaskId, oldName) => {
      const newName = prompt("Edit subtask name:", oldName);
      if (newName && newName.trim() && newName !== oldName) {
        editSubtask(list.id, taskId, subtaskId, newName.trim());
      }
    },
    [editSubtask, list.id]
  );

  const handleDeleteSubtask = useCallback(
    (taskId, subtaskId) => {
      deleteSubtask(list.id, taskId, subtaskId);
    },
    [deleteSubtask, list.id]
  );

  return (
    <div
      className={`rounded-xl border shadow-sm p-4 transition-colors duration-500 ${cardBg}`}
    >
      {/* List Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className={`text-lg font-semibold ${headingColor}`}>
          {list.title}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={handleEditListName}
            className="px-3 py-1 text-white rounded-md bg-blue-500"
          >
            Edit
          </button>
          <button
            onClick={handleDeleteList}
            className="px-3 py-1 text-white rounded-md bg-red-500"
          >
            Delete
          </button>
          <button
            onClick={handleAddTask}
            className="px-3 py-1 text-white rounded-md bg-green-500 text-sm"
          >
            + Task
          </button>
        </div>
      </div>

      {/* Tasks */}
      {list.tasks?.length ? (
        <ul className="space-y-2">
          {list.tasks.map((task) => (
            <li
              key={task.id}
              className={`p-2 rounded-md ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className={subTextColor}>{task.title}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddSubtask(task.id)}
                    className="px-2 py-1 text-white rounded bg-green-500 text-sm"
                  >
                    + Subtask
                  </button>
                  <button
                    onClick={() =>
                      handleEditTask(task.id, task.title)
                    }
                    className="px-2 py-1 text-white rounded bg-blue-500 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="px-2 py-1 text-white rounded bg-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Subtasks */}
              {task.subtasks?.length > 0 && (
                <ul className="ml-4 mt-2 space-y-1">
                  {task.subtasks.map((sub) => (
                    <li
                      key={sub.id}
                      className="flex justify-between items-center"
                    >
                      <span className={`${subTextColor} text-sm`}>
                        {sub.title}
                      </span>
                      <div className="flex gap-1">
                        <button
                          onClick={() =>
                            handleEditSubtask(
                              task.id,
                              sub.id,
                              sub.title
                            )
                          }
                          className="px-2 py-0.5 text-white rounded bg-blue-500 text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteSubtask(task.id, sub.id)
                          }
                          className="px-2 py-0.5 text-white rounded bg-red-500 text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className={`text-sm ${subTextColor} text-center py-2`}>
          No tasks added yet.
        </p>
      )}
    </div>
  );
}

export default memo(TodoListCard);
