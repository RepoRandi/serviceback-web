const url = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;
export async function getAllProducts() {
  const products = await fetch(`${url}/api/products.json`);
  return await products.json();
}
export async function getProductBySlug(slug) {
  const products = await fetch(`${url}/api/products.json`).then((res) =>
    res.json()
  );
  return products.find((current) => current.slug === slug);
}
