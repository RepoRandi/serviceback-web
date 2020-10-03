import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());
// const end_point_url = '/'

export default function useUser() {
  const { data, mutate, error } = useSWR('/api/user.json', fetcher);

  const addOrUpdateContactNumber = async (contact) => {
    console.log(contact, 'contact');
    // return await fetch(end_point_url,{method: 'POST', body: contact });
  };
  const addOrUpdateAddress = async (address) => {
    console.log(address, 'address');

    // return await fetch(end_point_url,{method: 'POST', body: address });
  };
  const addOrUpdatePaymentCard = async (payment_card) => {
    console.log(payment_card, 'payment_card');

    // return await fetch(end_point_url,{method: 'POST', body: payment_card });
  };
  const deleteContactNumber = async (contactId) => {
    console.log(contactId, 'contactId');

    // return await fetch(end_point_url,{method: 'POST', body: contactId });
  };
  const deleteAddress = async (addressId) => {
    console.log(addressId, 'addressId');

    // return await fetch(end_point_url,{method: 'POST', body: addressId });
  };
  const deletePaymentCard = async (cardId) => {
    console.log(cardId, 'cardId');

    // return await fetch(end_point_url,{method: 'POST', body: cardId });
  };

  return {
    // loggedOut,
    user: data,
    mutate,
    error,
    addOrUpdateContactNumber,
    addOrUpdateAddress,
    addOrUpdatePaymentCard,
    deleteContactNumber,
    deleteAddress,
    deletePaymentCard,
  };
}
