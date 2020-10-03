const url = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;

export async function getAllVendors() {
  const vendors = await fetch(`${url}/api/vendors.json`);
  return await vendors.json();
}
export async function getVendorBySlug(slug) {
  const vendors = await fetch(`${url}/api/vendors.json`).then((res) =>
    res.json()
  );
  return vendors.find((current) => current.slug === slug);
}
