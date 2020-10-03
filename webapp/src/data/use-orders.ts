import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());
interface CategoryProps {
  userId: number;
  limit: number;
}
export default function useOrders({ userId, limit }: CategoryProps) {
  const { data, mutate, error } = useSWR('/api/orders.json', fetcher);

  // const loading = !data && !error;
  const orders = data?.filter((current) => current.userId === userId);
  // const paginatedData = data?.slice(offset, limit);
  // const loggedOut = error && error.status === 403;

  return {
    // loading,
    error,
    data: orders,
    // loggedOut,
    // user: data,
    mutate,
  };
}
