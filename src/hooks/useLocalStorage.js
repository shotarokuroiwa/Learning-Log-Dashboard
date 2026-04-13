import { useState, useEffect } from "react";

const useLocalStorage = (key, initialvalue, setJSONError) => {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialvalue;
    } catch {
      return initialvalue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      setJSONError("LocalStrageエラー");
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
