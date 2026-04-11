import { useState, useEffect } from 'react'

const useLocalStorage = (key, initialvalue) => {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    
    return saved ? JSON.parse(saved) : initialvalue;
  });

  useEffect(() => {
    const onlyUserLogs = value.filter(log => !log.isMock); //mockデータは除外
    localStorage.setItem(key, JSON.stringify(onlyUserLogs));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage