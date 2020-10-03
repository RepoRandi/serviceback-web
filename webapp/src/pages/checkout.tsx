import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { Modal } from '@redq/reuse-modal';
import { SEO } from 'components/seo';
import Checkout from 'features/checkouts/checkout-two/checkout-two';
import { ProfileProvider } from 'contexts/profile/profile.provider';
import { useUserAddressList } from 'services/user-address';

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const CheckoutPage: NextPage<Props> = ({ deviceType }) => {
  const { data } = useUserAddressList();
  if (!(data || {}).data) return <div>loading...</div>;
  const address = data.data.map((a, idx) => {
    return {
      ...a,
      type: idx === 0 ? 'primary' : 'seconday',
    };
  });
  const user = {
    address,
  };

  const token = 'true';

  return (
    <>
      <SEO title="Checkout - ServiceBack" description="Checkout Details" />
      <ProfileProvider initData={user}>
        <Modal>
          <Checkout token={token} deviceType={deviceType} />
        </Modal>
      </ProfileProvider>
    </>
  );
};

export default CheckoutPage;
