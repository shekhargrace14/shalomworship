"use client";

import { createContext, useContext } from "react";
import { useSetlists } from "./useSetlists";

const SetlistsContext =
  createContext<ReturnType<typeof useSetlists> | null>(null);

export function SetlistsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useSetlists();

  return (
    <SetlistsContext.Provider value={value}>
      {children}
    </SetlistsContext.Provider>
  );
}

export function useSetlistsContext() {
  const ctx = useContext(SetlistsContext);
  if (!ctx) {
    throw new Error("useSetlistsContext must be used inside SetlistsProvider");
  }
  return ctx;
}
