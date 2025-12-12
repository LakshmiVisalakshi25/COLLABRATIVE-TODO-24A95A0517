import { createContext, useContext, useState, useEffect } from "react";

export const UIContext = createContext();

export function UIProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("ct_theme") || "light");
  const [isNewListOpen, setIsNewListOpen] = useState(false);

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    localStorage.setItem("ct_theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));
  const openNewListModal = () => setIsNewListOpen(true);
  const closeNewListModal = () => setIsNewListOpen(false);

  return (
    <UIContext.Provider value={{ theme, toggleTheme, isNewListOpen, openNewListModal, closeNewListModal }}>
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => useContext(UIContext);
