"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const remove = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const iconMap: Record<ToastType, React.ElementType> = {
    success: CheckCircle,
    error: XCircle,
    info: AlertCircle,
  };

  const colorMap: Record<ToastType, string> = {
    success: "border-success/30 bg-success/10",
    error: "border-red-500/30 bg-red-500/10",
    info: "border-premium/30 bg-premium/10",
  };

  const iconColorMap: Record<ToastType, string> = {
    success: "text-success",
    error: "text-red-400",
    info: "text-premium",
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-24 left-1/2 z-[100] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4 sm:bottom-28">
        {toasts.map((t) => {
          const Icon = iconMap[t.type];
          return (
            <div
              key={t.id}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-lg backdrop-blur-xl animate-in slide-in-from-bottom-2 ${colorMap[t.type]}`}
            >
              <Icon className={`h-5 w-5 flex-shrink-0 ${iconColorMap[t.type]}`} />
              <p className="flex-1 text-sm text-white">{t.message}</p>
              <button onClick={() => remove(t.id)} className="text-white/50 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
