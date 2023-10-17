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
    }
  }
}

export {};
