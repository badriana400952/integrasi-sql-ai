"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type NotifStatus = "success" | "error" | "warning" | "info";

interface NotifData {
  status: NotifStatus;
  content: string;
}

interface NotifContextType {
  notif: (data: NotifData) => void;
}

const NotifContext = createContext<NotifContextType | undefined>(undefined);

export const useNotif = () => {
  const ctx = useContext(NotifContext);
  if (!ctx) throw new Error("useNotif must be used within NotifProvider");
  return ctx;
};

export const NotifProvider = ({ children }: { children: ReactNode }) => {
  const [notifData, setNotifData] = useState<NotifData | null>(null);

  const notif = (data: NotifData) => {
    setNotifData(data);
    setTimeout(() => setNotifData(null), 9000); // hilang otomatis
  };

  return (
    <NotifContext.Provider value={{ notif }}>
      {children}
      {notifData && (
        <div
          className={`fixed top-13 right-[50%] translate-x-[50%] p-4 rounded-lg shadow-lg border transition-all duration-400
          ${
            notifData.status === "success"
              ? "bg-green-50 border-green-300 text-green-800"
              : notifData.status === "error"
              ? "bg-red-50 border-red-300 text-red-800"
              : notifData.status === "warning"
              ? "bg-yellow-50 border-yellow-300 text-yellow-800"
              : "bg-blue-50 border-blue-300 text-blue-800"
          }`}
          role="alert"
        >
          <div className="flex items-start gap-2 w-3xl">
            <svg
              className="w-5 h-5 mt-1 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 14a1 1 0 0 1-1-1v-3a1 1 0 1 1 2 0v3a1 1 0 0 1-1 1Zm0-8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
            </svg>
            <div>
              <p className="font-medium capitalize">{notifData.status}</p>
              <p className="text-sm">{notifData.content}</p>
            </div>
          </div>
        </div>
      )}
    </NotifContext.Provider>
  );
};
