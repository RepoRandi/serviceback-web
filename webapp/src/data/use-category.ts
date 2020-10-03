import useSWR from 'swr';

// import productFetcher from 'utils/api/product';
const fetcher = (url) => fetch(url).then((res) => res.json());
interface CategoryProps {
  type: string;
}
export default function useCategory({ type }: CategoryProps) {
  const { data, mutate, error } = useSWR('/api/categories.json', fetcher);

  const loading = !data && !error;
  const categories = data?.filter((current) => current.type === type);
  // const paginatedData = data?.slice(offset, limit);
  // const loggedOut = error && error.status === 403;

  return {
    loading,
    error,
    data: categories,
    // loggedOut,
    // user: data,
    mutate,
  };
}
