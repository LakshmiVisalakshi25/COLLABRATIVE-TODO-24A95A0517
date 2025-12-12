import { useContext } from "react";
import { TodosContext } from "../contexts/TodosContext";

export function useTodos() {
  const { lists, setLists } = useContext(TodosContext);

  const updateListName = (id, newName) => {
    setLists(prev =>
      prev.map(list => (list.id === id ? { ...list, title: newName } : list))
    );
  };

  const deleteList = (id) => {
    setLists(prev => prev.filter(list => list.id !== id));
  };

  return { lists, setLists, updateListName, deleteList };
}
