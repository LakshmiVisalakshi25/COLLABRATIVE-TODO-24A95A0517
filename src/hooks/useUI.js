import { useContext } from "react";
import { UIContext } from "../contexts/UIContext"; // now it works

export const useUI = () => useContext(UIContext);
