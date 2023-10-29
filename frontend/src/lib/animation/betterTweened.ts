import type { linear } from 'svelte/easing';
import type { Tweened } from 'svelte/motion';

import { tweened as nativeTweened } from 'svelte/motion';
import { get } from 'svelte/store';

interface TweenOptions {
  duration: number;
  easing?: typeof linear;
}

interface BetterTweened<T> extends Tweened<T> {
  lastSet: T;
  pause: () => Promise<void>;
  reset: () => Promise<void>;
  continue: () => Promise<void>;
  replay: () => Promise<void>;
}

export function betterTweened(initial: number, options: TweenOptions): BetterTweened<number> {
  const store = nativeTweened(initial, options) as BetterTweened<number>;
  const set = store.set;
  store.lastSet = initial;

  store.pause = () => {
    const value = get(store);
    return set(value, { duration: 0 });
  };

  store.reset = () => {
    return set(initial, { duration: 0 });
  };

  store.continue = () => {
    const value = get(store);
    const percentageCompleted = (value - initial) / (store.lastSet - initial);
    const remaining = options.duration - options.duration * percentageCompleted;

    return set(store.lastSet, { duration: remaining });
  };

  store.replay = async () => {
    await store.reset();
    return set(store.lastSet, options);
  };

  store.set = (newValue, options) => {
    store.lastSet = newValue;
    return set(newValue, options);
  };

  return store;
}
