declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}

    interface Post {
      title: string;
      content: string;
      id: number;
      thumbnailUrl: string;
      highlighted: boolean;
    }
  }

  interface ViewTransition {
    updateCallbackDone: Promise<void>;
    ready: Promise<void>;
    finished: Promise<void>;
    skipTransition: () => void;
  }

  interface Document {
    startViewTransition(updateCallback: () => Promise<void>): ViewTransition;
  }

  interface CSSStyleDeclaration {
    viewTransitionName: string;
  }
}

export {};
