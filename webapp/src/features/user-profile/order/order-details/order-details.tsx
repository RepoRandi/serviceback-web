import React from 'react';
import Table from 'rc-table';
import {
  DeliveryInfo,
  DeliveryAddress,
  Address,
  CostCalculation,
  PriceRow,
  Price,
  ProgressWrapper,
  OrderTableWrapper,
  OrderTable,
} from './order-details.style';
import Progress from 'components/progress-box/progress-box';
import { CURRENCY } from 'utils/constant';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { Button } from 'components/button/button';
import { openModal, closeModal } from '@redq/reuse-modal';
import PaymentModal from './payment-modal';
import OrderReviewModal from './review-modal';
import { updateOrder } from 'services/order';
import { LinkButton } from 'features/authentication-form/authentication-form.style';
import OrderEditModal from './edit-modal';
import { createReview } from 'services/review';

type OrderDetailsProps = {
  tableData?: any;
  columns?: any;
  progressData?: any;
  payementStatusOptions: any;
  order: any;
};

const components = {
  table: OrderTable,
};

const OrderDetails: React.FC<OrderDetailsProps> = ({
  tableData,
  columns,
  progressData,
  order,
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
      componentProps: { order: _order, onSave: updateOrderDetails },
    });
  };

  const handleReviewModal = (_order) => {
    openModal({
      show: true,
      overlayClassName: 'quick-view-overlay',
      closeOnClickOutside: true,
      component: OrderReviewModal,
      closeComponent: '',
      config: {
        enableResizing: false,
        disableDragging: true,
        className: 'quick-view-modal',
        width: 458,
        height: 'auto',
      },
      componentProps: { order: _order, onSave: createOrderReview },
    });
  };

  const handleEditModal = (_order) => {
    openModal({
      show: true,
      overlayClassName: 'quick-view-overlay',
      closeOnClickOutside: true,
      component: OrderEditModal,
      closeComponent: '',
      config: {
        enableResizing: false,
        disableDragging: true,
        className: 'quick-view-modal',
        width: 800,
        height: 'auto',
      },
      componentProps: { order: _order, onSave: updateOrderDetails },
    });
  };

  const updateOrderDetails = async (newOrder: any) => {
    const savedOrder = await updateOrder(newOrder);
    closeModal();
  };

  const createOrderReview = async (newReview: any) => {
    const savedReview = await createReview(newReview);
    closeModal();
  };

  const getOrderActionButton = () => {
    switch (true) {
      case order.paymentStatus === 'PAID' && !order.review:
        return (
          <Button
            style={{ width: '100%' }}
            onClick={() => handleReviewModal(order)}
          >
            Review
          </Button>
        );
      case order.paymentStatus === 'PAID' && order.review !== undefined:
        return (
          <Button
            style={{ width: '100%' }}
            onClick={() => handleReviewModal(order)}
            disabled={order.review}
          >
            Review
          </Button>
        );
      default:
        return (
          <Button
            style={{ width: '100%' }}
            onClick={() => handleModal(order)}
            disabled={order.paymentStatus !== 'AWAITING_PAYMENT'}
          >
            Pay
          </Button>
        );
    }
  };

  return (
    <>
      <DeliveryInfo>
        <DeliveryAddress>
          <h3>
            Address{' '}
            {order.status === 'REQUESTED' && (
              <LinkButton
                onClick={() => {
                  handleEditModal(order);
                }}
              >
                (Edit)
              </LinkButton>
            )}
          </h3>
          <Address>{`${order.address1}, \n${order.address2}, \nS${order.postalCode}`}</Address>
          <br />
          <h3>
            Date & Time{' '}
            {order.status === 'REQUESTED' && (
              <LinkButton
                onClick={() => {
                  handleEditModal(order);
                }}
              >
                (Edit)
              </LinkButton>
            )}
          </h3>
          <Address>
            {moment(order.datetime).format('DD-MM-YYYY hh:mm a')}
          </Address>
        </DeliveryAddress>

        <CostCalculation>
          <PriceRow>
            Submitted
            <Price>{moment(order.createdAt).format('DD MMM YYYY')}</Price>
          </PriceRow>
          <PriceRow className="grandTotal">
            <FormattedMessage id="totalText" defaultMessage="Total" />
            <Price>
              {CURRENCY}
              {order.totalPrice}
            </Price>
          </PriceRow>
          <PriceRow>
            Payment
            {order.paymentProofImageUrl ? (
              <Price>
                <a href={order.paymentProofImageUrl} download target="_blank">
                  {payementStatusOptions[order.paymentStatus]}
                </a>
              </Price>
            ) : (
              <Price>{payementStatusOptions[order.paymentStatus]}</Price>
            )}
          </PriceRow>
          <PriceRow>{getOrderActionButton()}</PriceRow>
        </CostCalculation>
      </DeliveryInfo>

      <ProgressWrapper>
        <Progress data={progressData} status={order.status} />
      </ProgressWrapper>

      <OrderTableWrapper>
        <Table
          columns={columns}
          data={tableData}
          rowKey={(record) => `${record.orderId}-${record.serviceId}`}
          components={components}
          className="orderDetailsTable"
        />
      </OrderTableWrapper>
    </>
  );
};

export default OrderDetails;
