import React, { useState, useEffect } from 'react';
import { Scrollbar } from 'components/scrollbar/scrollbar';
import {
  DesktopView,
  MobileView,
  OrderBox,
  OrderListWrapper,
  OrderList,
  OrderDetailsWrapper,
  Title,
  ItemWrapper,
  ItemDetails,
  ItemName,
  NoOrderFound,
} from './order.style';

import OrderDetails from './order-details/order-details';
import OrderCard from './order-card/order-card';
import OrderCardMobile from './order-card/order-card-mobile';
import useComponentSize from 'utils/useComponentSize';
import { FormattedMessage } from 'react-intl';
import ErrorMessage from 'components/error-message/error-message';
import { useOrderList } from 'services/order';

const progressData = {
  REQUESTED: 'Received',
  ASSIGNED: 'Assigned',
  COMPLETED: 'Completed',
};

const payementStatusOptions = {
  AWAITING_PAYMENT: 'Pending',
  PROCESSING: 'Processing',
  PAID: 'Paid',
};

const orderTableColumns = [
  {
    title: <FormattedMessage id="cartItems" defaultMessage="Items" />,
    dataIndex: '',
    key: 'items',
    width: 250,
    ellipsis: true,
    render: (text, record) => {
      return (
        <ItemWrapper>
          <ItemDetails>
            <ItemName>{record.service.name}</ItemName>
          </ItemDetails>
        </ItemWrapper>
      );
    },
  },
  {
    title: (
      <FormattedMessage id="intlTableColTitle2" defaultMessage="Quantity" />
    ),
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'center',
    width: 100,
  },
  {
    title: <FormattedMessage id="intlTableColTitle3" defaultMessage="Price" />,
    dataIndex: '',
    key: 'price',
    align: 'right',
    width: 100,
    render: (text, record) => {
      return <p>${record.service.price}</p>;
    },
  },
];

export enum OrderViewType {
  CURRENT,
  HISTORY,
}

const OrdersContent: React.FC<{ viewType: OrderViewType }> = ({ viewType }) => {
  const [targetRef, size] = useComponentSize();
  const [orders, setOrders] = useState([]);
  const [selection, setSelection] = useState(null);

  const filters =
    viewType === OrderViewType.CURRENT
      ? [
          {
            key: 'status',
            op: '$ne',
            value: 'COMPLETED',
          },
          {
            key: 'paymentStatus',
            op: '$ne',
            value: 'PAID',
          },
        ]
      : [
          {
            key: 'status',
            op: '$eq',
            value: 'COMPLETED',
          },
        ];
  const { data, error } = useOrderList(filters);

  useEffect(() => {
    if (((data || {}).data || []).length) {
      setOrders(data.data);
      setSelection(data.data[0]);
    }
  }, [data]);

  if (error) return <ErrorMessage message={error.message} />;
  if (!(data || {}).data) return <div>loading...</div>;

  return (
    <OrderBox>
      <DesktopView>
        <OrderListWrapper style={{ height: size.height }}>
          <Title style={{ padding: '0 20px' }}>
            {viewType === OrderViewType.CURRENT && 'Current Appointments'}
            {viewType === OrderViewType.HISTORY && 'History'}
          </Title>

          <Scrollbar className="order-scrollbar">
            <OrderList>
              {orders.length !== 0 ? (
                orders.map((current: any) => (
                  <OrderCard
                    key={current.id}
                    order={current}
                    className={current.id === selection?.id ? 'active' : ''}
                    onClick={() => setSelection(current)}
                  />
                ))
              ) : (
                <NoOrderFound>
                  <FormattedMessage
                    id="intlNoOrderFound"
                    defaultMessage="No order found"
                  />
                </NoOrderFound>
              )}
            </OrderList>
          </Scrollbar>
        </OrderListWrapper>

        <OrderDetailsWrapper ref={targetRef}>
          <Title style={{ padding: '0 20px' }}>Order Details</Title>
          {selection && (
            <OrderDetails
              order={selection}
              progressData={progressData}
              tableData={selection.orderItems}
              columns={orderTableColumns}
              payementStatusOptions={payementStatusOptions}
            />
          )}
        </OrderDetailsWrapper>
      </DesktopView>

      <MobileView>
        <OrderList>
          <Title style={{ padding: '0 20px' }}>
            {viewType === OrderViewType.CURRENT && 'Current Appointments'}
            {viewType === OrderViewType.HISTORY && 'History'}
          </Title>
          <OrderCardMobile
            orders={orders}
            progressData={progressData}
            columns={orderTableColumns}
            onClick={setSelection}
            payementStatusOptions={payementStatusOptions}
          />
        </OrderList>
      </MobileView>
    </OrderBox>
  );
};

export default OrdersContent;
