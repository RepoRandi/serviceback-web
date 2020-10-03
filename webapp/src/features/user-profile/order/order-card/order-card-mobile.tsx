import React from 'react';
import Table from 'rc-table';
import Collapse, { Panel } from 'rc-collapse';
import Progress from 'components/progress-box/progress-box';

import {
  OrderListHeader,
  Status,
  OrderMeta,
  Meta,
  CardWrapper,
  OrderDetail,
  DeliveryInfo,
  DeliveryAddress,
  Address,
  CostCalculation,
  PriceRow,
  Price,
  ProgressWrapper,
  OrderTable,
  OrderTableMobile,
} from './order-card.style';

import { CURRENCY } from 'utils/constant';
import moment from 'moment';
import { Button } from 'components/button/button';
import PaymentModal from '../order-details/payment-modal';
import { openModal, closeModal } from '@redq/reuse-modal';
import { updateOrder } from 'services/order';

type MobileOrderCardProps = {
  onClick?: (e: any) => void;
  className?: any;
  tableData?: any;
  columns?: any;
  progressData?: any;
  progressStatus?: any;
  orders?: any;
  payementStatusOptions: any;
};

const components = {
  table: OrderTable,
};

const OrderCard: React.FC<MobileOrderCardProps> = ({
  onClick,
  className,
  columns,
  progressData,
  orders,
  payementStatusOptions,
}) => {
  const handleModal = (_order) => {
    openModal({
      show: true,
      overlayClassName: 'quick-view-overlay',
      closeOnClickOutside: true,
      component: PaymentModal,
      closeComponent: '',
      config: {
        enableResizing: false,
        disableDragging: true,
        className: 'quick-view-modal',
        width: 458,
        height: 'auto',
      },
      componentProps: { order: _order, onSave: updatePaymentProofImageUrl },
    });
  };

  const updatePaymentProofImageUrl = async (
    paymentProofImageUrl: string,
    orderId: string,
  ) => {
    const newOrder = {
      id: orderId,
      paymentProofImageUrl,
      paymentStatus: 'PROCESSING',
    };
    const savedOrder = await updateOrder(newOrder);
    closeModal();
  };

  return (
    <>
      <Collapse
        accordion={true}
        className={`accordion ${className}`}
        defaultActiveKey="active"
        expandIcon={() => {}}
      >
        {orders.map((order: any) => (
          <Panel
            header={
              <CardWrapper onClick={() => onClick(order)}>
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
                    Date :{' '}
                    <span>{moment(order.datetime).format('DD-MM-YYYY')}</span>
                  </Meta>
                  <Meta>
                    Time :{' '}
                    <span>{moment(order.datetime).format('hh:mm a')}</span>
                  </Meta>
                  <Meta className="price">
                    Price :
                    <span>
                      {CURRENCY}
                      {order.totalPrice}
                    </span>
                  </Meta>
                  <Meta>
                    Payment Status :
                    <span>{payementStatusOptions[order.paymentStatus]}</span>
                  </Meta>
                </OrderMeta>
              </CardWrapper>
            }
            headerClass="accordion-title"
            key={order.id}
          >
            <OrderDetail>
              <DeliveryInfo>
                <DeliveryAddress>
                  <h3>Address</h3>
                  <Address>{`${order.address1}, \n${order.address2}, \nS${order.postalCode}`}</Address>
                  <br />
                  <h3>Appointment Date & Time</h3>
                  <Address>
                    {moment(order.datetime).format('DD-MM-YYYY hh:mm a')}
                  </Address>
                </DeliveryAddress>

                <CostCalculation>
                  <PriceRow>
                    Submitted
                    <Price>
                      {moment(order.createdAt).format('DD MMM YYYY')}
                    </Price>
                  </PriceRow>
                  <PriceRow className="grandTotal">
                    Total
                    <Price>
                      {CURRENCY}
                      {order.totalPrice}
                    </Price>
                  </PriceRow>
                  <PriceRow className="grandTotal">
                    Payment
                    <Price>{order.paymentStatus}</Price>
                  </PriceRow>
                  <PriceRow>
                    <Button
                      style={{ width: '100%' }}
                      onClick={() => handleModal(order)}
                      disabled={order.paymentStatus !== 'AWAITING_PAYMENT'}
                    >
                      Pay
                    </Button>
                  </PriceRow>
                </CostCalculation>
              </DeliveryInfo>

              <ProgressWrapper>
                <Progress data={progressData} status={order.status} />
              </ProgressWrapper>

              <OrderTableMobile>
                <Table
                  columns={columns}
                  data={order.orderItems}
                  rowKey={(record) => `${record.orderId}-${record.serviceId}`}
                  components={components}
                  scroll={{ x: 450 }}
                  // scroll={{ y: 250 }}
                />
              </OrderTableMobile>
            </OrderDetail>
          </Panel>
        ))}
      </Collapse>
    </>
  );
};

export default OrderCard;
