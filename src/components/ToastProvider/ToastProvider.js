import React from "react";
import { useEscapeKey } from "../../hooks/use-escape-key";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  function createToast(message, variant) {
    setToasts([
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ]);
  }

  function dismissToast(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });
    setToasts(nextToasts);
  }

  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, []);

  useEscapeKey(handleEscape);

  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;