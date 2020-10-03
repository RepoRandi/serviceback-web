import useSWR from 'swr';
const { NEXT_PUBLIC_API_URL } = process.env;

const fetcher = (url) =>
  fetch(url, {
    method: 'get',
    headers: new Headers({
      Authorization: `Bearer ${localStorage.getItem('idToken')}`,
    }),
  }).then((res) => res.json());

export async function createReview(review) {
  const url = `${NEXT_PUBLIC_API_URL}/api/v1/review`;
  const updatedAddress = await fetch(url, {
    method: 'post',
    headers: new Headers({
      Authorization: `Bearer ${localStorage.getItem('idToken')}`,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(review),
  }).then((res) => res.json());

  return updatedAddress;
}
