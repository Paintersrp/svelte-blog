import { redirect } from '@sveltejs/kit';

export async function load({ fetch, locals }) {
  if (locals.user.role === 'admin' || locals.user.role === 'super') {
    const postsResponse = await fetch(
      `http://localhost:4000/posts?pageSize=20&page=1&includes=User,Comment,Tag,Category`
    );
    const postsData = await postsResponse.json();

    const metaResponse = await fetch(`http://localhost:4000/meta/posts`);
    const metaData = await metaResponse.json();

    return {
      posts: postsData.data.data,
      totalPosts: postsData.data.count,
      meta: metaData
    };
  }

  throw redirect(303, `/`);
}
