import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { AuthProvider } from "./contexts/AuthContext";
import { UIProvider } from "./contexts/UIContext";
import { TodosProvider } from "./contexts/TodosContext";
import { CollaborationProvider } from "./contexts/CollaborationContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CollaborationProvider>
        <TodosProvider>
          <UIProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </UIProvider>
        </TodosProvider>
      </CollaborationProvider>
    </AuthProvider>
  </React.StrictMode>
);
