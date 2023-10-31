import { applyAction } from '$app/forms';
import { goto } from '$app/navigation';
import { toastStore } from '$lib/stores/toast';
import type { ActionResult } from '@sveltejs/kit';

export const redirectWithToast = (
  message: string,
  type: Toast['type'] = 'success',
  duration = 5000
) => {
  return async ({ result }: { result: ActionResult }) => {
    if (result.type === 'redirect') {
      goto(result.location).then(() =>
        setTimeout(() => toastStore.addToast(message, type, 'top-right', duration), 400)
      );
    } else {
      await applyAction(result);
    }
  };
};
