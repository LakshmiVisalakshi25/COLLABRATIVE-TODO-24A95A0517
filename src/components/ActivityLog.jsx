import React from "react";
import { useActivities } from "../contexts/ActivitiesContext";


export default function ActivityLog() {
  const { activities } = useActivities();

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-xl shadow-md max-h-96 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Activity Log</h2>
      {activities.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No activities yet.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {activities.map((activity, index) => (
            <li key={index} className="p-2 bg-white dark:bg-gray-800 rounded shadow-sm text-gray-900 dark:text-white">
              <span>{activity.message}</span>
              <br />
              <small className="text-gray-500 dark:text-gray-400 text-xs">{new Date(activity.timestamp).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
