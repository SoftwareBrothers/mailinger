import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState(() => {
    const storeItem = localStorage.getItem(key);
    return storeItem ? safeJsonParse<typeof initialValue>(storeItem) : initialValue;
  });

  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch(error) {
      // tslint:disable-next-line
      console.warn(error);
    }
  }

  return [storedValue, setValue]
}

function safeJsonParse<T>(value: string): T {
  try {
    return JSON.parse(value);
  } catch (error) {
    return null as any;
  }
}
