import useSWR, { mutate } from 'swr';
const { NEXT_PUBLIC_API_URL } = process.env;

const fetcher = (url) =>
  fetch(url, {
    method: 'get',
    headers: new Headers({
      Authorization: `Bearer ${localStorage.getItem('idToken')}`,
    }),
  }).then((res) => res.json());

export function useUserBankAccountList() {
  const { data, error } = useSWR(
    `${NEXT_PUBLIC_API_URL}/api/v1/user-bank-account`,
    fetcher,
  );

  const loading = !data && !error;

  return {
    loading,
    error,
    data,
  };
}

export function useUpdateUserBankAccount(bankAccount) {
  const { data, error } = useSWR(
    `${NEXT_PUBLIC_API_URL}/api/v1/user-bank-account/${bankAccount.id}`,
    (url) =>
      fetch(url, {
        method: 'put',
        headers: new Headers({
          Authorization: `Bearer ${localStorage.getItem('idToken')}`,
        }),
        body: {
          ...bankAccount,
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

export async function updateUserBankAccount(bankAccount) {
  const url = `${NEXT_PUBLIC_API_URL}/api/v1/user-bank-account/${bankAccount.id}`;
  const updatedAddress = await fetch(url, {
    method: 'put',
    headers: new Headers({
      Authorization: `Bearer ${localStorage.getItem('idToken')}`,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(bankAccount),
  }).then((res) => res.json());
  mutate(`${NEXT_PUBLIC_API_URL}/api/v1/user-bank-account`);

  return updatedAddress;
}

export async function createUserBankAccount(bankAccount) {
  const url = `${NEXT_PUBLIC_API_URL}/api/v1/user-bank-account`;
  const updatedAddress = await fetch(url, {
    method: 'post',
    headers: new Headers({
      Authorization: `Bearer ${localStorage.getItem('idToken')}`,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(bankAccount),
  }).then((res) => res.json());
  mutate(`${NEXT_PUBLIC_API_URL}/api/v1/user-bank-account`);

  return updatedAddress;
}

export async function deleteUserBankAccount(bankAccount) {
  const url = `${NEXT_PUBLIC_API_URL}/api/v1/user-bank-account/${bankAccount.id}`;
  const response = await fetch(url, {
    method: 'delete',
    headers: new Headers({
      Authorization: `Bearer ${localStorage.getItem('idToken')}`,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(bankAccount),
  });
  mutate(`${NEXT_PUBLIC_API_URL}/api/v1/user-bank-account`);

  return response;
}

export async function getUserBankAccountList() {
  const url = `${NEXT_PUBLIC_API_URL}/api/v1/user-bank-account`;
  const bankAccountes = await fetch(url, {
    method: 'get',
    headers: new Headers({
      Authorization: `Bearer ${localStorage.getItem('idToken')}`,
      'Content-Type': 'application/json',
    }),
  }).then((res) => res.json());

  return bankAccountes;
}
