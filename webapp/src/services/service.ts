import useSWR from 'swr';
const { NEXT_PUBLIC_API_URL } = process.env;

const fetcher = (url) => fetch(url).then((res) => res.json());

export function useServiceList({ name }) {
  const filters = name !== '' ? `filter=name||$contL||${name}` : '';
  const { data, error } = useSWR(
    `${NEXT_PUBLIC_API_URL}/api/v1/service?${filters}`,
    fetcher,
  );

  const loading = !data && !error;

  return {
    loading,
    error,
    data,
  };
}

export function useServiceWithSlug(slug) {
  const { data, error } = useSWR(
    `${NEXT_PUBLIC_API_URL}/api/v1/service/${slug}`,
    fetcher,
  );

  const loading = !data && !error;

  return {
    loading,
    error,
    data,
  };
}

export async function fetchServiceList() {
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/v1/service`);
  console.log({ res });

  return res.json();
}

export async function fetchServiceWithSlug(slug) {
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/v1/service/${slug}`);

  return res.json();
}
