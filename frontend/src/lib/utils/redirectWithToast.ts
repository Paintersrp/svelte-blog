import { applyAction } from '$app/forms';
import { goto } from '$app/navigation';
import { toastStore } from '$lib/stores/toast';
import type { ActionResult } from '@sveltejs/kit';
import type { Writable } from 'svelte/store';

interface RedirectEnhance {
  message: string;
  isLoading?: Writable<boolean>;
  type?: Toast['type'];
  position?: Toast['position'];
  duration?: Toast['duration'];
  delay?: number;
}

export const redirectWithToast = ({
  message,
  isLoading,
  type = 'success',
  position = 'top-right',
  duration = 5000,
  delay = 400
}: RedirectEnhance) => {
  isLoading?.set(true);

  return async ({ result }: { result: ActionResult }) => {
    isLoading?.set(false);

    if (result.type === 'redirect') {
      goto(result.location).then(() =>
        setTimeout(() => toastStore.addToast(message, type, position, duration), delay)
      );
    } else {
      await applyAction(result);
    }
  };
};
