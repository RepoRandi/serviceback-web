import useSWR from 'swr';
const { NEXT_PUBLIC_API_URL } = process.env;

const fetcher = (url) => fetch(url).then((res) => res.json());

export function useServiceCategoryList() {
  const { data, error } = useSWR(
    `${NEXT_PUBLIC_API_URL}/api/v1/service-category`,
    fetcher,
  );

  const loading = !data && !error;

  return {
    loading,
    error,
    data,
  };
}

export function useServiceCategoryWithSlug(slug) {
  const { data, error } = useSWR(
    `${NEXT_PUBLIC_API_URL}/api/v1/service-category/${slug}`,
    fetcher,
  );

  const loading = !data && !error;

  return {
    loading,
    error,
    data,
  };
}
