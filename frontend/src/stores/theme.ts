import { writable } from 'svelte/store';
import { lightTheme } from '../themes/light';
import { darkTheme } from '../themes/dark';

const createThemeStore = () => {
  const { subscribe, update } = writable(lightTheme);

  return {
    subscribe,
    toggleTheme: () =>
      update((currentTheme) => {
        return currentTheme === lightTheme ? darkTheme : lightTheme;
      })
  };
};

export const theme = createThemeStore();
