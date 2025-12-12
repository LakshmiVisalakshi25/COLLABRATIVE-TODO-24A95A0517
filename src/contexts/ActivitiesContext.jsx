import React, { createContext, useContext, useState, useEffect } from "react";

const ActivitiesContext = createContext();

export const ActivitiesProvider = ({ children }) => {
  const [activities, setActivities] = useState(() => {
    return JSON.parse(localStorage.getItem("ct_activities") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("ct_activities", JSON.stringify(activities));
  }, [activities]);

  const addActivity = (message) => {
    const newActivity = { id: Date.now(), message, timestamp: new Date().toISOString() };
    setActivities((prev) => [newActivity, ...prev]);
  };

  return (
    <ActivitiesContext.Provider value={{ activities, addActivity }}>
      {children}
    </ActivitiesContext.Provider>
  );
};

export const useActivities = () => {
  return useContext(ActivitiesContext);
};
