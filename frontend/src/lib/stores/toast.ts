import { writable } from 'svelte/store';

const createToastStore = () => {
  const { subscribe, update, set } = writable<Toast[]>([]);

  return {
    subscribe,
    addToast: (
      message: string,
      type: Toast['type'] = 'info',
      position: Toast['position'] = 'bottom-center',
      duration: number = 5000
    ) => update((toasts) => [...toasts, { id: Date.now(), message, type, position, duration }]),
    removeToast: (id: number) => update((toasts) => toasts.filter((toast) => toast.id !== id)),
    clearAll: () => set([])
  };
};

export const toastStore = createToastStore();
