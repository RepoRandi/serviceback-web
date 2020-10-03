import React from 'react';
import {
  SingleOrderList,
  OrderListHeader,
  TrackID,
  Status,
  OrderMeta,
  Meta,
} from './order-card.style';
import { FormattedMessage } from 'react-intl';

import { CURRENCY } from 'utils/constant';
import moment from 'moment';

type OrderCardProps = {
  order?: any;
  onClick?: (e: any) => void;
  className?: any;
};

const OrderCard: React.FC<OrderCardProps> = ({ order, onClick, className }) => {
  return (
    <>
      <SingleOrderList onClick={onClick} className={className}>
        <OrderListHeader>
          <Status>{order.status}</Status>
        </OrderListHeader>

        <OrderMeta>
          <Meta className="price">
            Service :
            <span>
              <span>{order.orderItems[0].service.name}</span>
            </span>
          </Meta>
          <Meta>
            Quantity :<span>{order.orderItems[0].quantity}</span>
          </Meta>
          <Meta>
            Date : <span>{moment(order.datetime).format('DD-MM-YYYY')}</span>
          </Meta>
          <Meta>
            Time : <span>{moment(order.datetime).format('hh:mm a')}</span>
          </Meta>
          <Meta className="price">
            Price :
            <span>
              {CURRENCY}
              {order.totalPrice}
            </span>
          </Meta>
          <Meta>
            Payment Status :<span>{order.paymentStatus}</span>
          </Meta>
        </OrderMeta>
      </SingleOrderList>
    </>
  );
};

export default OrderCard;
