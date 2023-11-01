import { fail, redirect } from '@sveltejs/kit';
import { ValidationError } from 'yup';

import { catchValidationError } from '$lib/utils';
import { PostSchema, createPost } from './utils';

export const actions = {
  addPost: async ({ request, locals }) => {
    const data = await request.formData();
    const parsedData = Object.fromEntries(data);
    const authorId = locals.user.id;

    if (!authorId) {
      fail(400);
    }

    let postId: number;

    try {
      await PostSchema.validate({ ...parsedData, authorId: locals.user.id }, { abortEarly: false });

      data.append('authorId', String(authorId));

      const post = await createPost(data);
      postId = post.id;
    } catch (error) {
      if (error instanceof ValidationError) {
        const returnData = catchValidationError(error, {
          title: parsedData.title,
          category: parsedData.category,
          tags: parsedData.tags,
          content: parsedData.content,
          thumbnailUrl: ''
        });

        return fail(400, returnData);
      }

      return fail(500, { error: 'Internal Server Error' });
    }

    if (postId) throw redirect(303, `/${postId}`);
  }
};
