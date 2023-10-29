import { axios } from '$lib/utils/axios.js';
import { fail } from '@sveltejs/kit';

export async function load({ params, fetch }) {
  const response = await fetch(
    `http://localhost:4000/posts/${params.id}?includes=User,Comment[User],Tag,Category`
  );
  const data = await response.json();

  return {
    post: data.data
  };
}

export const actions = {
  addComment: async ({ request, locals, params }) => {
    const data = await request.formData();
    const content = String(data.get('content'));

    if (!content) {
      return fail(400, { content, missing: true });
    }

    await axios.post(`/comments?includes=User`, {
      content,
      postId: params.id,
      authorId: locals.user.id
    });

    return { success: true };
  }
};
