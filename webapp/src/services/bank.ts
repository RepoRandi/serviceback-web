import useSWR from 'swr';
const { NEXT_PUBLIC_API_URL } = process.env;

const fetcher = (url) => fetch(url).then((res) => res.json());

export function useBankList() {
  const { data, error } = useSWR(`${NEXT_PUBLIC_API_URL}/api/v1/bank`, fetcher);

  const loading = !data && !error;

  return {
    loading,
    error,
    data,
  };
}
