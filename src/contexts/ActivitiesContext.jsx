import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef
} from "react";
import uuid from "react-uuid";

const ActivitiesContext = createContext();

export const ActivitiesProvider = ({ children }) => {
  const [activities, setActivities] = useState(() => {
    return JSON.parse(localStorage.getItem("ct_activities") || "[]");
  });

  const channelRef = useRef(null);

  /* ---------- INIT BROADCAST CHANNEL ---------- */
  useEffect(() => {
    const channel = new BroadcastChannel("ct_activities_channel");
    channelRef.current = channel;

    channel.onmessage = (event) => {
      setActivities((prev) => {
        if (prev.some(a => a.id === event.data.id)) return prev;
        return [event.data, ...prev];
      });
    };

    return () => {
      channel.close();
      channelRef.current = null;
    };
  }, []);

  /* ---------- PERSIST ---------- */
  useEffect(() => {
    localStorage.setItem("ct_activities", JSON.stringify(activities));
  }, [activities]);

  /* ---------- ADD ACTIVITY ---------- */
  const addActivity = useCallback((activity) => {
    const newActivity = {
      id: uuid(),
      ...activity
    };

    setActivities((prev) => [newActivity, ...prev]);

    // ✅ SAFE POST
    if (channelRef.current) {
      channelRef.current.postMessage(newActivity);
    }
  }, []);

  const value = useMemo(() => ({
    activities,
    addActivity
  }), [activities, addActivity]);

  return (
    <ActivitiesContext.Provider value={value}>
      {children}
    </ActivitiesContext.Provider>
  );
};

export const useActivities = () => useContext(ActivitiesContext);
