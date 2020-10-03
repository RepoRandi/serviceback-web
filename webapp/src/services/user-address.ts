import useSWR, { mutate } from 'swr';
const { NEXT_PUBLIC_API_URL } = process.env;

const fetcher = (url) =>
  fetch(url, {
    method: 'get',
    headers: new Headers({
      Authorization: `Bearer ${localStorage.getItem('idToken')}`,
    }),
  }).then((res) => res.json());

export function useUserAddressList() {
  const { data, error } = useSWR(
    `${NEXT_PUBLIC_API_URL}/api/v1/user-address`,
    fetcher,
  );

  const loading = !data && !error;

  return {
    loading,
    error,
    data,
  };
}

export function useUpdateUserAddress(address) {
  const { data, error } = useSWR(
    `${NEXT_PUBLIC_API_URL}/api/v1/user-address/${address.id}`,
    (url) =>
      fetch(url, {
        method: 'put',
        headers: new Headers({
          Authorization: `Bearer ${localStorage.getItem('idToken')}`,
        }),
        body: {
          ...address,
        },
      }).then((res) => res.json()),
  );

  const loading = !data && !error;

  return {
    loading,
    error,
    data,
  };
}

export async function updateUserAddress(address) {
  const url = `${NEXT_PUBLIC_API_URL}/api/v1/user-address/${address.id}`;
  const updatedAddress = await fetch(url, {
    method: 'put',
    headers: new Headers({
      Authorization: `Bearer ${localStorage.getItem('idToken')}`,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(address),
  }).then((res) => res.json());
  mutate(`${NEXT_PUBLIC_API_URL}/api/v1/user-address`);

  return updatedAddress;
}

export async function createUserAddress(address) {
  const url = `${NEXT_PUBLIC_API_URL}/api/v1/user-address`;
  const updatedAddress = await fetch(url, {
    method: 'post',
    headers: new Headers({
      Authorization: `Bearer ${localStorage.getItem('idToken')}`,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(address),
  }).then((res) => res.json());
  mutate(`${NEXT_PUBLIC_API_URL}/api/v1/user-address`);

  return updatedAddress;
}

export async function deleteUserAddress(address) {
  const url = `${NEXT_PUBLIC_API_URL}/api/v1/user-address/${address.id}`;
  const response = await fetch(url, {
    method: 'delete',
    headers: new Headers({
      Authorization: `Bearer ${localStorage.getItem('idToken')}`,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(address),
  });
  mutate(`${NEXT_PUBLIC_API_URL}/api/v1/user-address`);

  return response;
}

export async function getUserAddressList() {
  const url = `${NEXT_PUBLIC_API_URL}/api/v1/user-address`;
  const addresses = await fetch(url, {
    method: 'get',
    headers: new Headers({
      Authorization: `Bearer ${localStorage.getItem('idToken')}`,
      'Content-Type': 'application/json',
    }),
  }).then((res) => res.json());
  mutate(`${NEXT_PUBLIC_API_URL}/api/v1/user-address`);

  return addresses;
}
