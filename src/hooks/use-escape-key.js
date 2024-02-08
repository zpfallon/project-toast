import React from "react";

export function useEscapeKey(callback) {
  React.useEffect(() => {
    function handleKeydown(event) {
      if (event.code === "Escape") {
        callback(event);
      }

      return () => {
        window.removeEventListener("keydown", handleKeydown);
      };
    }
    window.addEventListener("keydown", handleKeydown);
  }, [callback]);
}
