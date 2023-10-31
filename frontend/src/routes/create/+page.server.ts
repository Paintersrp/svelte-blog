/* eslint-disable @typescript-eslint/no-explicit-any */
import { axios } from '$lib/utils/axios';
import { fail, redirect } from '@sveltejs/kit';

import { z } from 'zod';

const isBlob = (value: any): value is Blob => value instanceof Blob;

const PostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  authorId: z.number().min(1),
  tags: z.string(),
  category: z.string(),
  thumbnailUrl: z.custom(isBlob, { message: 'Thumbnail must be a Blob' })
});

export const actions = {
  addPost: async ({ request, locals }) => {
    const data = Object.fromEntries(await request.formData());
    let postId: number;

    try {
      const validatedData: {
        [key: string]: string | number | Blob | undefined;
        thumbnailUrl?: Blob;
      } = PostSchema.parse({
        ...data,
        authorId: locals.user.id
      });

      const formData = new FormData();

      for (const key in validatedData) {
        if (key === 'thumbnailUrl') {
          formData.append(key, validatedData[key]!);
        } else {
          formData.append(key, validatedData[key]!.toString());
        }
      }

      const post: App.Post = await axios
        .post(`/posts`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((res) => res.data.data);

      postId = post.id;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return fail(400, { data, error: error.errors });
      }

      console.error(error);
      return fail(500, { error: 'Internal Server Error' });
    }

    if (postId) throw redirect(303, `/${postId}`);
  }
};
