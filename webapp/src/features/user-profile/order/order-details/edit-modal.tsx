import React, { useState } from 'react';
import {
  Button,
  Wrapper,
  Container,
  Heading,
  SubHeading,
  DeliverySchedule,
  Divider,
} from './edit-modal.style';
import Schedules from 'features/schedule/schedule';
import DayPicker from 'react-day-picker';
import { ProfileProvider } from 'contexts/profile/profile.provider';
import { useUserAddressList } from 'services/user-address';
import { Input } from 'components/forms/input';
import moment from 'moment';

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

type OrderEditModalProps = {
  order: any;
  onSave: (newOrder: any) => void;
};

const OrderEditModal: React.FC<OrderEditModalProps> = ({ order, onSave }) => {
  const [address1, setAddress1] = useState(order.address1);
  const [address2, setAddress2] = useState(order.address2);
  const [postalCode, setPostalCode] = useState(order.postalCode);
  const [selectedDate, setSelectedDate] = useState(new Date(order.datetime));
  const [selectedTime, setSelectedTime] = useState(
    moment(order.datetime).format('HH:mm'),
  );

  const { data } = useUserAddressList();
  if (!(data || {}).data) return <div>loading...</div>;
  const addressData = data.data.map((a, idx) => {
    return {
      ...a,
      type: idx === 0 ? 'primary' : 'seconday',
    };
  });
  const user = {
    address: addressData,
  };

  const handleDayClick = (day) => {
    setSelectedDate(day);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const timeComponent = selectedTime.split(':');
    const datetime = new Date(
      selectedDate.setHours(
        parseInt(timeComponent[0]),
        parseInt(timeComponent[1]),
        0,
        0,
      ),
    );
    onSave({
      id: order.id,
      address1,
      address2,
      postalCode,
      datetime,
    });
  };

  return (
    <ProfileProvider initData={user}>
      <Wrapper>
        <Container>
          <Heading>Edit Order Details</Heading>

          <SubHeading>
            You can change your requested detail until an agent is assigned to
            your request
          </SubHeading>
          <form onSubmit={handleSave}>
            <Input
              type="text"
              placeholder="Address 1"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              required
              height="48px"
              backgroundColor="#F7F7F7"
              mb="10px"
            />
            <Input
              type="text"
              placeholder="Address 1"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              required
              height="48px"
              backgroundColor="#F7F7F7"
              mb="10px"
            />
            <Input
              type="text"
              placeholder="Address 1"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
              height="48px"
              backgroundColor="#F7F7F7"
              mb="10px"
            />
            <Divider />
            <DeliverySchedule>
              <DayPicker
                disabledDays={{
                  before: tomorrow,
                }}
                onDayClick={handleDayClick}
                selectedDays={selectedDate}
              />
              <Schedules
                duration={order.orderItems[0].service.durationMinutes}
                increment={true}
                onSelect={(time) => setSelectedTime(time)}
              />
            </DeliverySchedule>
            <Button
              variant="primary"
              size="big"
              style={{ width: '100%' }}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Container>
      </Wrapper>
    </ProfileProvider>
  );
};

export default OrderEditModal;
