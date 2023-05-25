import { Dispatch, SetStateAction, useEffect, useState } from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;

/**
 *
 * @param key a string to identify the value being cached
 * @param initialValue the default value
 * @returns "value": stateful value,  "setValue": set state action to update stateful value
 * @example const [storage, setStorage] = useLocalStorage<User>("user");
 */
export const useLocalStorage = <T,>(
  key: string,
  initialValue?: T
): [T, SetValue<T>] => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    const newItem = JSON.stringify(value);

    localStorage.setItem(key, newItem);
  }, [key, value]);
  return [value, setValue];
};
