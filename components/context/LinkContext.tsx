"use client";
import React, { createContext, useState, useContext } from "react";

export interface LinkContextValue {
  link: string;
  prompt: string;
}

interface LinkContextProviderProps {
  linkValue: LinkContextValue;
  setLinkValue: React.Dispatch<React.SetStateAction<LinkContextValue>>;
}

const LinkContext = createContext<LinkContextProviderProps | undefined>(undefined);

export const LinkProvider = ({ children }: { children: React.ReactNode }) => {
  const [linkValue, setLinkValue] = useState<LinkContextValue>({
    link: "",
    prompt: "",
  });

  return (
    <LinkContext.Provider value={{ linkValue, setLinkValue }}>
      {children}
    </LinkContext.Provider>
  );
};

// ✅ helper untuk konsumsi di mana pun
export const useLink = () => {
  const context = useContext(LinkContext);
  if (!context) throw new Error("useLink must be used within LinkProvider");
  return context;
};
