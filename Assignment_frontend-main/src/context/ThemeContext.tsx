'use client';

import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useMemo,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

/**
 * Saves the old ThemeContext for future use
 * @param {string} theme - Name of curent theme
 * @return {string} previousTheme
 */
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

/**
 * Gets user preferences from local storage
 * @param {string} key - localStorage key
 * @return {array} getter and setter for user preferred theme
 */
function useStorageTheme(key: string): [string, Dispatch<SetStateAction<string>>] {
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const userPreference =
      !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    const storedTheme = localStorage.getItem(key) || (userPreference ? 'dark' : 'light');
    setTheme(storedTheme);
  }, [key]);

  // update stored theme
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, theme);
  }, [theme, key]);

  return [theme, setTheme];
}

// create context with default undefined value
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

// create context provider
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useStorageTheme('theme');

  // update root element class on theme change
  const oldTheme = usePrevious(theme);
  useLayoutEffect(() => {
    if (typeof document === 'undefined') return;

    if (oldTheme) {
      document.documentElement.classList.remove(`theme-${oldTheme}`);
    }
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme, oldTheme]);

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
