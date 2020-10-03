import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDrawerDispatch, useDrawerState } from 'context/DrawerContext';
import { Scrollbars } from 'react-custom-scrollbars';
import Input from 'components/Input/Input';
import Button, { KIND } from 'components/Button/Button';
import DrawerBox from 'components/DrawerBox/DrawerBox';
import { Row, Col } from 'components/FlexBox/FlexBox';
import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from '../DrawerItems/DrawerItems.style';
import { FormFields, FormLabel } from 'components/FormFields/FormFields';
import { useOrderUpdate } from 'services/order';
import Select from 'components/Select/FormSelect';
import {
  ORDER_PAYMENT_STATUS_OPTIONS,
  ORDER_STATUS_OPTIONS,
} from 'config/constants';
import DatePicker from 'components/DatePicker/DatePicker';

type Props = any;

const OrderUpdateForm: React.FC<Props> = props => {
  const dispatch = useDrawerDispatch();
  const data = useDrawerState('data');
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: data,
  });
  const currentStatus = ORDER_STATUS_OPTIONS.filter(status => {
    return status.value === data.status;
  });
  const currentPaymentStatus = ORDER_PAYMENT_STATUS_OPTIONS.filter(
    paymentStatus => {
      return paymentStatus.value === data.paymentStatus;
    },
  );
  const [status, setStatus] = useState(currentStatus);
  const [paymentStatus, setPaymentStatus] = useState(currentPaymentStatus);

  const [datetime, setDatetime] = React.useState(new Date(data.datetime));

  React.useEffect(() => {
    register({ name: 'imageUrl' });
  }, [register]);

  const [mutate] = useOrderUpdate();

  const onSubmit = async () => {
    const newOrder = {
      id: data.id,
      status: status[0].value,
      paymentStatus: paymentStatus[0].value,
      datetime,
    };
    try {
      await mutate(newOrder);
    } catch (error) {
      console.error('err', error);
    }
    closeDrawer();
  };

  const handleStatusChange = ({ value }) => {
    setValue('status', value[0].value);
    setStatus(value);
  };

  const handlePaymentStatusChange = ({ value }) => {
    setValue('paymentStatus', value[0].value);
    setPaymentStatus(value);
  };
  console.log(data);

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Update Order</DrawerTitle>
      </DrawerTitleWrapper>

      <Form onSubmit={handleSubmit(onSubmit)} style={{ height: '100%' }}>
        <Scrollbars
          autoHide
          renderView={props => (
            <div {...props} style={{ ...props.style, overflowX: 'hidden' }} />
          )}
          renderTrackHorizontal={props => (
            <div
              {...props}
              style={{ display: 'none' }}
              className="track-horizontal"
            />
          )}
        >
          <Row>
            <Col lg={4}>
              <FieldDetails>Order Details</FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Order ID</FormLabel>
                  <Input
                    inputRef={register({ required: true })}
                    name="id"
                    disabled
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Email</FormLabel>
                  <Input
                    inputRef={register({ required: true })}
                    name="userEmail"
                    disabled
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Price</FormLabel>
                  <Input
                    inputRef={register({ required: true })}
                    name="totalPrice"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Date Time</FormLabel>
                  <DatePicker
                    selected={datetime}
                    onChange={date => setDatetime(date)}
                    timeInputLabel="Time:"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeInput
                    timeIntervals={30}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Status</FormLabel>
                  <Select
                    options={ORDER_STATUS_OPTIONS}
                    value={status}
                    onChange={handleStatusChange}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>
                    Payment{' '}
                    {data.paymentProofImageUrl && (
                      <a
                        href={data.paymentProofImageUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download
                      </a>
                    )}
                  </FormLabel>
                  <Select
                    options={ORDER_PAYMENT_STATUS_OPTIONS}
                    value={paymentStatus}
                    onChange={handlePaymentStatusChange}
                  />
                </FormFields>
              </DrawerBox>
            </Col>
          </Row>
        </Scrollbars>

        <ButtonGroup>
          <Button
            kind={KIND.minimal}
            onClick={closeDrawer}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '50%',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  borderBottomLeftRadius: '3px',
                  marginRight: '15px',
                  color: $theme.colors.red400,
                }),
              },
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '50%',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  borderBottomLeftRadius: '3px',
                }),
              },
            }}
          >
            Update Order
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default OrderUpdateForm;
