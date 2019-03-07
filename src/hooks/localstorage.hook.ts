import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  transformMethod?: (value: any) => T,
): [T, (value: any) => void, () => void] {
  const [storedValue, setStoredValue] = useState(() => {
    const storeItem = localStorage.getItem(key);
    const parsedItem = storeItem
      ? safeJsonParse<typeof initialValue>(storeItem)
      : initialValue;

    if (typeof transformMethod === 'function') {
      return parsedItem ? transformMethod(parsedItem) : initialValue;
    }
    return parsedItem;
  });

  const setValue = (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // tslint:disable-next-line
      console.warn('Error', error);
    }
  };

  const removeValue = () => {
    localStorage.removeItem(key);
    setStoredValue(null as any);
  };

  return [storedValue, setValue, removeValue];
}

function safeJsonParse<T>(value: string): T {
  try {
    return JSON.parse(value);
  } catch (error) {
    return null as any;
  }
}
