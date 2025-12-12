// src/components/TodoItem.jsx
import React, { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { useAuth } from "../hooks/useAuth";
import { useCollab } from "../contexts/CollaborationContext";

export default function TodoItem({ task, listId }) {
  const { updateTask, removeTask, toggleTask } = useTodos();
  const { user } = useAuth();
  const { pushActivity } = useCollab();

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const saveEdit = () => {
    if (!editText.trim()) return;
    updateTask(listId, task.id, { title: editText.trim() });
    pushActivity({ user: user.name, action: `edited task "${task.title}" to "${editText.trim()}"` });
    setIsEditing(false);
  };

  const onDelete = () => {
    removeTask(listId, task.id);
    pushActivity({ user: user.name, action: `deleted task "${task.title}"` });
  };

  const toggleComplete = () => {
    toggleTask(listId, task.id);
    pushActivity({ user: user.name, action: `${task.completed ? "marked incomplete" : "completed"} task "${task.title}"` });
  };

  return (
    <div className="flex items-center justify-between border p-2 rounded">
      <div className="flex items-center gap-2 flex-1">
        <input type="checkbox" checked={task.completed} onChange={toggleComplete} />
        {isEditing ? (
          <input
            className="border p-1 flex-1"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={(e) => e.key === "Enter" && saveEdit()}
            autoFocus
          />
        ) : (
          <span
            onDoubleClick={() => setIsEditing(true)}
            className={`flex-1 ${task.completed ? "line-through text-gray-500" : ""}`}
          >
            {task.title}
          </span>
        )}
      </div>
      <div className="flex gap-1">
        {!isEditing && <button onClick={() => setIsEditing(true)} className="text-blue-500 text-xs">Edit</button>}
        <button onClick={onDelete} className="text-red-500 text-xs">Delete</button>
      </div>
    </div>
  );
}
