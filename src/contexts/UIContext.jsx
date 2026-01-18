import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo
} from "react";

export const UIContext = createContext();

export function UIProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("ct_theme") || "light"
  );
  const [isNewListOpen, setIsNewListOpen] = useState(false);

  /* ---------------- THEME EFFECT ---------------- */
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("ct_theme", theme);
  }, [theme]);

  /* ---------------- MEMOIZED ACTIONS ---------------- */
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const openNewListModal = useCallback(() => {
    setIsNewListOpen(true);
  }, []);

  const closeNewListModal = useCallback(() => {
    setIsNewListOpen(false);
  }, []);

  /* ---------------- MEMOIZED CONTEXT VALUE ---------------- */
  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      isNewListOpen,
      openNewListModal,
      closeNewListModal
    }),
    [
      theme,
      toggleTheme,
      isNewListOpen,
      openNewListModal,
      closeNewListModal
    ]
  );

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => useContext(UIContext);
