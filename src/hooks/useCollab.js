import { useContext } from "react";
import CollabContext from "../contexts/CollaborationContext";
export const useCollab = () => useContext(CollabContext);
