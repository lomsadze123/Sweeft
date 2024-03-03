import React, { createContext, useContext, useState } from "react";
import { ClickIdContextType } from "../types/Types";

// Create a context for the clickId state
export const ClickIdContext = createContext<ClickIdContextType | null>(null);

// Custom hook for using the clickId state
export const useClickId = () => {
  const context = useContext(ClickIdContext);
  if (!context) {
    throw new Error("useClickId must be used within a ClickIdProvider");
  }
  return context;
};

interface ClickIdProviderProps {
  children: React.ReactNode;
}

// Provider component to wrap your app and manage the clickId state
export const ClickIdProvider: React.FC<ClickIdProviderProps> = ({
  children,
}) => {
  const [clickId, setClickId] = useState("");

  return (
    <ClickIdContext.Provider value={{ clickId, setClickId }}>
      {children}
    </ClickIdContext.Provider>
  );
};

export default useClickId;
