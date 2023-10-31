/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import type { Editor } from './Editor';

export function handleAction(action: string | Function | undefined, editor: Editor) {
  if (action === undefined) {
    console.error('Action is undefined');
    return;
  }

  if (typeof action === 'function') {
    action();
  } else {
    const command = (editor.chain().focus() as any)[action];

    if (command) {
      command().run();
    } else {
      console.error(`Unknown action: ${action}`);
    }
  }
}
