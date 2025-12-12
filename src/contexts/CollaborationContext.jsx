import React, { createContext, useState, useEffect } from "react";

export const CollaborationContext = createContext();

export function CollaborationProvider({ children }) {
  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem("ct_activities");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("ct_activities", JSON.stringify(activities));
  }, [activities]);

  return (
    <CollaborationContext.Provider value={{ activities, setActivities }}>
      {children}
    </CollaborationContext.Provider>
  );
}
