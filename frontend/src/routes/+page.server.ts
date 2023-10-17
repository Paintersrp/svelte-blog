export async function load({ fetch }) {
  const response = await fetch(`http://localhost:4000/posts?pageSize=10&page=1`);
  const data = await response.json();

  return {
    posts: data.data.data,
    totalPosts: data.data.count
  };
}
