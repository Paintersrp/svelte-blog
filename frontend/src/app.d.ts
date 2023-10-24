declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}

    interface User {
      id: number;
      username: string;
    }

    interface Comment {
      id: number;
      content: string;
    }

    interface Tag {
      id: number;
      name: string;
    }

    interface Category {
      id: number;
      name: string;
    }

    interface Post {
      id: number;
      createdAt: string;
      updatedAt: string;
      authorId: number;
      title: string;
      content: string;
      publishedAt: string;
      status: string;
      highlighted: boolean;
      thumbnailUrl: string;
      categoryId: number;
      User: User;
      Category: Category;
      Comments: Comment[];
      Tags: Tag[];
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
