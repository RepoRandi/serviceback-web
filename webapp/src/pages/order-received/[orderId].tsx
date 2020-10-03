import React, { useEffect } from 'react';
import { SEO } from 'components/seo';
import OrderReceived from 'features/order-received/order-received';
import { useRouter } from 'next/router';
import { useOrder } from 'services/order';
import { useAppDispatch } from 'contexts/app/app.provider';
import { AppHeaderType } from 'utils/constant';
import ErrorMessage from 'components/error-message/error-message';

const OrderReceivedPage = () => {
  const { query } = useRouter();
  const dispatch = useAppDispatch();

  const { data: order, error } = useOrder(query.orderId);

  useEffect(() => {
    dispatch({
      type: 'SET_HEADER_TYPE',
      payload: {
        type: AppHeaderType.WITH_TITLE,
        title: 'Order',
      },
    });
  }, []);

  if (!order) {
    return <p>Loading...</p>;
  }

  console.log({ order });
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <SEO title="Order - ServiceBack" description="Order Details" />
      <OrderReceived order={order} />
    </>
  );
};

export default OrderReceivedPage;
