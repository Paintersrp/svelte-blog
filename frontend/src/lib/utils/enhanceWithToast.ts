import { applyAction } from '$app/forms';
import { toastStore } from '$lib/stores/toast';
import type { ActionResult } from '@sveltejs/kit';

export const enhanceWithToast = (
  message: string,
  type: Toast['type'] = 'info',
  duration = 5000
) => {
  return async ({ result, update }: { result: ActionResult; update: EnhanceUpdate }) => {
    update({ reset: true });
    await applyAction(result);

    if (result.status === 200) {
      toastStore.addToast(message, type, 'top-right', duration);
    }
  };
};
