import useSWR, { mutate } from 'swr';
const { NEXT_PUBLIC_API_URL } = process.env;

export const encodeFilter = (filters) => {
  const encoded = filters.reduce((acc, { key, value, op }) => {
    return `${acc}&or=${key}||${op}||${value}`;
  }, '');

  return encoded;
};

const fetcher = (url) =>
  fetch(url, {
    method: 'get',
    headers: new Headers({
      Authorization: `Bearer ${localStorage.getItem('idToken')}`,
    }),
  }).then((res) => res.json());

export function useOrderList(_filters = []) {
  const filters = _filters.length > 0 ? encodeFilter(_filters) : '';
  const { data, error } = useSWR(
    `${NEXT_PUBLIC_API_URL}/api/v1/order?limit=1000${filters}`,
    fetcher,
  );

  const loading = !data && !error;

  return {
    loading,
    error,
    data,
  };
}

export function useOrder(orderId) {
  const { data, error } = useSWR(
    `${NEXT_PUBLIC_API_URL}/api/v1/order/${orderId}`,
    fetcher,
  );

  const loading = !data && !error;

  return {
    loading,
    error,
    data,
  };
}

export async function updateOrder(order) {
  const url = `${NEXT_PUBLIC_API_URL}/api/v1/order/${order.id}`;
  const updatedAddress = await fetch(url, {
    method: 'put',
    headers: new Headers({
      Authorization: `Bearer ${localStorage.getItem('idToken')}`,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(order),
  }).then((res) => res.json());
  mutate(
    `${NEXT_PUBLIC_API_URL}/api/v1/order?limit=1000&or=status||$ne||COMPLETED&or=paymentStatus||$ne||PAID`,
  );
  mutate(
    `${NEXT_PUBLIC_API_URL}/api/v1/order?limit=1000&or=status||$ew||COMPLETED`,
  );

  return updatedAddress;
}

export async function createOrder(order) {
  const url = `${NEXT_PUBLIC_API_URL}/api/v1/order`;
  const updatedAddress = await fetch(url, {
    method: 'post',
    headers: new Headers({
      Authorization: `Bearer ${localStorage.getItem('idToken')}`,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(order),
  }).then((res) => res.json());

  return updatedAddress;
}

export async function addOrderItemsToOrder(order, orderItems) {
  const url = `${NEXT_PUBLIC_API_URL}/api/v1/order/${order.id}/order-item/bulk`;
  const updatedAddress = await fetch(url, {
    method: 'post',
    headers: new Headers({
      Authorization: `Bearer ${localStorage.getItem('idToken')}`,
      'Content-Type': 'application/json',
    }),
    body: `{"bulk": ${JSON.stringify(orderItems)}}`,
  }).then((res) => res.json());

  return updatedAddress;
}
