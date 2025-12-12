export const initialTodos = {
  lists: [
    // sample
    {
      id: "inbox",
      title: "Personal",
      owner: "system",
      tasks: [
        { id: "t1", title: "Welcome — try adding a task", completed: false, owner: "system", tags: [] }
      ]
    }
  ]
};

function todosReducer(state, action) {
  switch (action.type) {
    case "ADD_LIST": {
      return { ...state, lists: [action.payload, ...state.lists] };
    }
    case "REMOVE_LIST": {
      return { ...state, lists: state.lists.filter(l => l.id !== action.payload) };
    }
    case "ADD_TASK": {
      const { listId, task } = action.payload;
      return {
        ...state,
        lists: state.lists.map(l => l.id === listId ? { ...l, tasks: [task, ...l.tasks] } : l)
      };
    }
    case "UPDATE_TASK": {
      const { listId, taskId, updates } = action.payload;
      return {
        ...state,
        lists: state.lists.map(l => {
          if (l.id !== listId) return l;
          return { ...l, tasks: l.tasks.map(t => t.id === taskId ? { ...t, ...updates } : t) };
        })
      };
    }
    case "REMOVE_TASK": {
      const { listId, taskId } = action.payload;
      return {
        ...state,
        lists: state.lists.map(l => l.id === listId ? { ...l, tasks: l.tasks.filter(t => t.id !== taskId) } : l)
      };
    }
    default:
      return state;
  }
}

export default todosReducer;
