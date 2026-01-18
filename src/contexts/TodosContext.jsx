import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo
} from "react";
import uuid from "react-uuid";
import { useActivities } from "./ActivitiesContext";

export const TodosContext = createContext();

/* ---------------- INITIAL STATE ---------------- */
const initialState = {
  lists: []
};

/* ---------------- REDUCER ---------------- */
function todosReducer(state, action) {
  switch (action.type) {
    case "ADD_LIST":
      return { ...state, lists: [action.payload, ...state.lists] };

    case "EDIT_LIST":
      return {
        ...state,
        lists: state.lists.map(list =>
          list.id === action.payload.listId
            ? { ...list, title: action.payload.title }
            : list
        )
      };

    case "DELETE_LIST":
      return {
        ...state,
        lists: state.lists.filter(list => list.id !== action.payload)
      };

    case "ADD_TASK":
      return {
        ...state,
        lists: state.lists.map(list =>
          list.id === action.payload.listId
            ? { ...list, tasks: [...list.tasks, action.payload.task] }
            : list
        )
      };

    case "EDIT_TASK":
      return {
        ...state,
        lists: state.lists.map(list =>
          list.id === action.payload.listId
            ? {
                ...list,
                tasks: list.tasks.map(task =>
                  task.id === action.payload.taskId
                    ? { ...task, title: action.payload.title }
                    : task
                )
              }
            : list
        )
      };

    case "DELETE_TASK":
      return {
        ...state,
        lists: state.lists.map(list =>
          list.id === action.payload.listId
            ? {
                ...list,
                tasks: list.tasks.filter(
                  task => task.id !== action.payload.taskId
                )
              }
            : list
        )
      };

    case "ADD_SUBTASK":
      return {
        ...state,
        lists: state.lists.map(list =>
          list.id === action.payload.listId
            ? {
                ...list,
                tasks: list.tasks.map(task =>
                  task.id === action.payload.taskId
                    ? {
                        ...task,
                        subtasks: [...task.subtasks, action.payload.subtask]
                      }
                    : task
                )
              }
            : list
        )
      };

    case "EDIT_SUBTASK":
      return {
        ...state,
        lists: state.lists.map(list =>
          list.id === action.payload.listId
            ? {
                ...list,
                tasks: list.tasks.map(task =>
                  task.id === action.payload.taskId
                    ? {
                        ...task,
                        subtasks: task.subtasks.map(sub =>
                          sub.id === action.payload.subtaskId
                            ? { ...sub, title: action.payload.title }
                            : sub
                        )
                      }
                    : task
                )
              }
            : list
        )
      };

    case "DELETE_SUBTASK":
      return {
        ...state,
        lists: state.lists.map(list =>
          list.id === action.payload.listId
            ? {
                ...list,
                tasks: list.tasks.map(task =>
                  task.id === action.payload.taskId
                    ? {
                        ...task,
                        subtasks: task.subtasks.filter(
                          sub => sub.id !== action.payload.subtaskId
                        )
                      }
                    : task
                )
              }
            : list
        )
      };

    default:
      return state;
  }
}

/* ---------------- PROVIDER ---------------- */
export function TodosProvider({ children }) {
  const [state, dispatch] = useReducer(todosReducer, initialState);
  const { addActivity } = useActivities();

  /* ---------- LIST ACTIONS ---------- */
  const addList = useCallback((title) => {
    const newList = { id: uuid(), title, tasks: [] };
    dispatch({ type: "ADD_LIST", payload: newList });

    addActivity({
      type: "add_list",
      message: `New list "${title}" was created`,
      timestamp: new Date().toISOString()
    });
  }, [addActivity]);

  const editList = useCallback((listId, newTitle) => {
    const list = state.lists.find(l => l.id === listId);

    dispatch({ type: "EDIT_LIST", payload: { listId, title: newTitle } });

    if (list) {
      addActivity({
        type: "edit_list",
        message: `List "${list.title}" renamed to "${newTitle}"`,
        timestamp: new Date().toISOString()
      });
    }
  }, [state.lists, addActivity]);

  const deleteList = useCallback((listId) => {
    const list = state.lists.find(l => l.id === listId);

    dispatch({ type: "DELETE_LIST", payload: listId });

    if (list) {
      addActivity({
        type: "delete_list",
        message: `List "${list.title}" was deleted`,
        timestamp: new Date().toISOString()
      });
    }
  }, [state.lists, addActivity]);

  /* ---------- TASK ACTIONS ---------- */
  const addTask = useCallback((listId, title) => {
    const list = state.lists.find(l => l.id === listId);
    const task = { id: uuid(), title, tags: [], subtasks: [] };

    dispatch({ type: "ADD_TASK", payload: { listId, task } });

    if (list) {
      addActivity({
        type: "add_task",
        message: `Task "${title}" added to list "${list.title}"`,
        timestamp: new Date().toISOString()
      });
    }
  }, [state.lists, addActivity]);

  const editTask = useCallback((listId, taskId, title) => {
    const list = state.lists.find(l => l.id === listId);
    const task = list?.tasks.find(t => t.id === taskId);

    dispatch({ type: "EDIT_TASK", payload: { listId, taskId, title } });

    if (list && task) {
      addActivity({
        type: "edit_task",
        message: `Task "${task.title}" renamed to "${title}" in list "${list.title}"`,
        timestamp: new Date().toISOString()
      });
    }
  }, [state.lists, addActivity]);

  const deleteTask = useCallback((listId, taskId) => {
    const list = state.lists.find(l => l.id === listId);
    const task = list?.tasks.find(t => t.id === taskId);

    dispatch({ type: "DELETE_TASK", payload: { listId, taskId } });

    if (list && task) {
      addActivity({
        type: "delete_task",
        message: `Task "${task.title}" deleted from list "${list.title}"`,
        timestamp: new Date().toISOString()
      });
    }
  }, [state.lists, addActivity]);

  /* ---------- SUBTASK ACTIONS ---------- */
  const addSubtask = useCallback((listId, taskId, title) => {
    const list = state.lists.find(l => l.id === listId);
    const task = list?.tasks.find(t => t.id === taskId);
    const subtask = { id: uuid(), title };

    dispatch({ type: "ADD_SUBTASK", payload: { listId, taskId, subtask } });

    if (list && task) {
      addActivity({
        type: "add_subtask",
        message: `Subtask "${title}" added to task "${task.title}" in list "${list.title}"`,
        timestamp: new Date().toISOString()
      });
    }
  }, [state.lists, addActivity]);

  const editSubtask = useCallback((listId, taskId, subtaskId, title) => {
    const list = state.lists.find(l => l.id === listId);
    const task = list?.tasks.find(t => t.id === taskId);
    const subtask = task?.subtasks.find(s => s.id === subtaskId);

    dispatch({
      type: "EDIT_SUBTASK",
      payload: { listId, taskId, subtaskId, title }
    });

    if (list && task && subtask) {
      addActivity({
        type: "edit_subtask",
        message: `Subtask "${subtask.title}" renamed to "${title}" in task "${task.title}"`,
        timestamp: new Date().toISOString()
      });
    }
  }, [state.lists, addActivity]);

  const deleteSubtask = useCallback((listId, taskId, subtaskId) => {
    const list = state.lists.find(l => l.id === listId);
    const task = list?.tasks.find(t => t.id === taskId);
    const subtask = task?.subtasks.find(s => s.id === subtaskId);

    dispatch({
      type: "DELETE_SUBTASK",
      payload: { listId, taskId, subtaskId }
    });

    if (list && task && subtask) {
      addActivity({
        type: "delete_subtask",
        message: `Subtask "${subtask.title}" deleted from task "${task.title}" in list "${list.title}"`,
        timestamp: new Date().toISOString()
      });
    }
  }, [state.lists, addActivity]);

  /* ---------- MEMOIZED CONTEXT VALUE ---------- */
  const value = useMemo(() => ({
    lists: state.lists,
    addList,
    editList,
    deleteList,
    addTask,
    editTask,
    deleteTask,
    addSubtask,
    editSubtask,
    deleteSubtask
  }), [
    state.lists,
    addList,
    editList,
    deleteList,
    addTask,
    editTask,
    deleteTask,
    addSubtask,
    editSubtask,
    deleteSubtask
  ]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
}

/* ---------------- HOOK ---------------- */
export function useTodos() {
  return useContext(TodosContext);
}
