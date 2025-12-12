import React, { createContext, useState, useContext } from "react";
import { useActivities } from "../hooks/useActivities";

export const TodosContext = createContext();

export function TodosProvider({ children }) {
  const [lists, setLists] = useState([]);
  const { addActivity } = useActivities();

  // --- List Actions ---
  const addList = (title) => {
    const newList = { id: Date.now(), title, tasks: [] };
    setLists(prev => [newList, ...prev]);
    addActivity({
      type: "new_list",
      message: `New list "${title}" was created`,
      timestamp: new Date().toISOString(),
    });
  };

  const editList = (listId, newTitle) => {
    setLists(prev => prev.map(list => {
      if (list.id === listId) {
        addActivity({
          type: "edit_list",
          message: `List "${list.title}" renamed to "${newTitle}"`,
          timestamp: new Date().toISOString(),
        });
        return { ...list, title: newTitle };
      }
      return list;
    }));
  };

  const deleteList = (listId) => {
    setLists(prev => {
      const list = prev.find(l => l.id === listId);
      const updated = prev.filter(l => l.id !== listId);
      if (list) {
        addActivity({
          type: "delete_list",
          message: `List "${list.title}" was deleted`,
          timestamp: new Date().toISOString(),
        });
      }
      return updated;
    });
  };

  // --- Task Actions ---
  const addTask = (listId, taskTitle) => {
    setLists(prev => prev.map(list => {
      if (list.id !== listId) return list;

      const newTask = { id: Date.now(), title: taskTitle, subtasks: [] };
      const updatedTasks = [...list.tasks, newTask];

      addActivity({
        type: "add_task",
        message: `Task "${taskTitle}" added to list "${list.title}"`,
        timestamp: new Date().toISOString(),
      });

      return { ...list, tasks: updatedTasks };
    }));
  };

  const editTask = (listId, taskId, newTitle) => {
    setLists(prev => prev.map(list => {
      if (list.id !== listId) return list;

      const updatedTasks = list.tasks.map(task => {
        if (task.id === taskId) {
          addActivity({
            type: "edit_task",
            message: `Task "${task.title}" renamed to "${newTitle}" in list "${list.title}"`,
            timestamp: new Date().toISOString(),
          });
          return { ...task, title: newTitle };
        }
        return task;
      });

      return { ...list, tasks: updatedTasks };
    }));
  };

  const deleteTask = (listId, taskId) => {
    setLists(prev => prev.map(list => {
      if (list.id !== listId) return list;

      const task = list.tasks.find(t => t.id === taskId);
      const updatedTasks = list.tasks.filter(t => t.id !== taskId);

      if (task) {
        addActivity({
          type: "delete_task",
          message: `Task "${task.title}" deleted from list "${list.title}"`,
          timestamp: new Date().toISOString(),
        });
      }

      return { ...list, tasks: updatedTasks };
    }));
  };

  // --- Subtask Actions ---
  const addSubtask = (listId, taskId, subtaskTitle) => {
    setLists(prev => prev.map(list => {
      if (list.id !== listId) return list;

      const updatedTasks = list.tasks.map(task => {
        if (task.id !== taskId) return task;

        const newSubtask = { id: Date.now(), title: subtaskTitle };
        const updatedSubtasks = [...task.subtasks, newSubtask];

        addActivity({
          type: "add_subtask",
          message: `Subtask "${subtaskTitle}" added to task "${task.title}" in list "${list.title}"`,
          timestamp: new Date().toISOString(),
        });

        return { ...task, subtasks: updatedSubtasks };
      });

      return { ...list, tasks: updatedTasks };
    }));
  };

  const editSubtask = (listId, taskId, subtaskId, newTitle) => {
    setLists(prev => prev.map(list => {
      if (list.id !== listId) return list;

      const updatedTasks = list.tasks.map(task => {
        if (task.id !== taskId) return task;

        const updatedSubtasks = task.subtasks.map(sub => {
          if (sub.id === subtaskId) {
            addActivity({
              type: "edit_subtask",
              message: `Subtask "${sub.title}" renamed to "${newTitle}" in task "${task.title}"`,
              timestamp: new Date().toISOString(),
            });
            return { ...sub, title: newTitle };
          }
          return sub;
        });

        return { ...task, subtasks: updatedSubtasks };
      });

      return { ...list, tasks: updatedTasks };
    }));
  };

  const deleteSubtask = (listId, taskId, subtaskId) => {
    setLists(prev => prev.map(list => {
      if (list.id !== listId) return list;

      const updatedTasks = list.tasks.map(task => {
        if (task.id !== taskId) return task;

        const subtask = task.subtasks.find(s => s.id === subtaskId);
        const updatedSubtasks = task.subtasks.filter(s => s.id !== subtaskId);

        if (subtask) {
          addActivity({
            type: "delete_subtask",
            message: `Subtask "${subtask.title}" deleted from task "${task.title}" in list "${list.title}"`,
            timestamp: new Date().toISOString(),
          });
        }

        return { ...task, subtasks: updatedSubtasks };
      });

      return { ...list, tasks: updatedTasks };
    }));
  };

  return (
    <TodosContext.Provider value={{
      lists,
      setLists,
      addList,
      editList,
      deleteList,
      addTask,
      editTask,
      deleteTask,
      addSubtask,
      editSubtask,
      deleteSubtask
    }}>
      {children}
    </TodosContext.Provider>
  );
}

// ✅ Custom hook
export function useTodos() {
  return useContext(TodosContext);
}
