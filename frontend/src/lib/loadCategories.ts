import { categories } from '$stores/categories';
import { get } from 'svelte/store';

export async function loadCategories() {
  const $categories = get(categories);
  if ($categories.length === 0) {
    const response = await fetch('http://localhost:4000/categories');
    const data = await response.json();

    categories.set(data.data);
  }
}
