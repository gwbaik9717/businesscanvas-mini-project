import { useState } from "react";
import { StorageManager } from "../types/StorageManager";

export function useStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const storage = StorageManager;

  const [state, setState] = useState<T>(() => {
    try {
      const storedValue = storage.get(key);
      if (storedValue !== null) {
        return JSON.parse(storedValue) as T;
      }
    } catch (error) {
      console.error(`Error parsing stored value for key "${key}":`, error);
    }
    return initialValue;
  });

  const setStoredState = (value: React.SetStateAction<T>) => {
    setState((prev) => {
      const newValue =
        typeof value === "function"
          ? (value as (prevState: T) => T)(prev)
          : value;

      try {
        storage.set(key, JSON.stringify(newValue));
      } catch (error) {
        console.error(`Error saving value for key "${key}":`, error);
      }

      return newValue;
    });
  };

  return [state, setStoredState];
}
