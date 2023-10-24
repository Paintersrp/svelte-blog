export async function load({ params, fetch }) {
  const response = await fetch(
    `http://localhost:4000/posts/${params.id}?includes=User,Comment[User],Tag,Category`
  );
  const data = await response.json();

  return {
    post: data.data
  };
}
