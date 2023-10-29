export async function load({ fetch }) {
  const postsResponse = await fetch(
    `http://localhost:4000/posts?pageSize=25&page=1&includes=User,Comment,Tag,Category`
  );
  const postsData = await postsResponse.json();

  const categoriesResponse = await fetch(`http://localhost:4000/categories`);
  const categoriesData = await categoriesResponse.json();

  return {
    posts: postsData.data.data,
    totalPosts: postsData.data.count,
    categories: categoriesData.data.data
  };
}
