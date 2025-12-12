import { useContext } from "react";
import { CollaborationContext } from "../contexts/CollaborationContext";

export function useActivities() {
  const { activities, setActivities } = useContext(CollaborationContext);

  const addActivity = (activity) => {
    const updated = [activity, ...activities];
    setActivities(updated);
    localStorage.setItem("ct_activities", JSON.stringify(updated));
  };

  return { activities, addActivity };
}
