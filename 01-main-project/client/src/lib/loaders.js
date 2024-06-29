export const singlePageLoader = async ({ request, params }) => {
  const res = await fetch(`/api/posts/${params.id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch post with id ${params.id}`);
  }
  const data = await res.json();
  return data;
};
