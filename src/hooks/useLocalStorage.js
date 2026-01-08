import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue) {
        setValue(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function() {
        originalSetItem.apply(this, arguments);
        const event = new Event('storageCustom');
        window.dispatchEvent(event);
    };

    const handleCustomEvent = () => {
        const latestValue = localStorage.getItem(key);
        if (latestValue) setValue(JSON.parse(latestValue));
    };

    window.addEventListener("storageCustom", handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("storageCustom", handleCustomEvent);
    };
  }, [key]);

  return [value, setValue];
};