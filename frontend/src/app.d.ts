declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: {
        id: number;
        username: string;
        role: string;
      };

      logout: boolean;
    }
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

    // on:mouseenter={() => durationProgress.pause()}

    interface Category {
      id: number | string;
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

  /*
   * Auth Section
   */
  type AuthContent = {
    id: number;
    role: 'super' | 'admin' | 'user';
    username: string;
    accessToken: string;
    refreshToken: string;
  };

  type AuthResponse = {
    data: AuthContent;
  };

  type LoginDTO = { username: string; password: string };

  type RegisterDTO = LoginDTO & { salt: string };

  type SaltResponse = { data: { salt?: string } };

  /*
   * Toast Section
   */
  type ToastType = 'info' | 'success' | 'warning' | 'error';
  type ToastPosition =
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';

  interface Toast {
    id: number;
    message: string;
    type: ToastType;
    position: ToastPosition;
    duration: number;
  }

  interface ValidatedCreationData {
    title?: string;
    content?: string;
    authorId?: number;
    thumbnailUrl?: Blob;
    tags: string;
    category: string;
    [key: string]: string | number | Blob | undefined;
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

  type EnhanceUpdate = (
    options?:
      | {
          reset: boolean;
        }
      | undefined
  ) => Promise<void>;
}

export {};
