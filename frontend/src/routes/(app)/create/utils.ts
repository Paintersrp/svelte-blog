import { axios } from '$lib/utils';
import * as Yup from 'yup';

const isImageBlob = (value: unknown): value is Blob =>
  value instanceof Blob && value.size > 0 && value.type.startsWith('image/');

export const PostSchema = Yup.object().shape({
  title: Yup.string().min(1, 'Title is required'),
  content: Yup.string().min(1, 'Content is required'),
  authorId: Yup.number().min(1, 'Author ID must be at least 1'),
  tags: Yup.string().required('Tags are required'),
  category: Yup.string().required('Category is required'),
  thumbnailUrl: Yup.mixed().test('is-image-blob', 'Thumbnail is required', isImageBlob)
});

export const createPost = async (data: FormData): Promise<App.Post> => {
  return await axios
    .post<{ data: App.Post }>(`/posts`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then((res) => res.data.data);
};
