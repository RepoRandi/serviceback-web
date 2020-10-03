import React, { useContext, useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { Button } from 'components/button/button';
import { CURRENCY } from 'utils/constant';
import { Scrollbar } from 'components/scrollbar/scrollbar';
import CheckoutWrapper, {
  CheckoutContainer,
  CheckoutInformation,
  InformationBox,
  DeliverySchedule,
  CheckoutSubmit,
  TermConditionText,
  TermConditionLink,
  CartWrapper,
  CalculationWrapper,
  OrderInfo,
  Title,
  ItemsWrapper,
  Items,
  Quantity,
  Multiplier,
  ItemInfo,
  Price,
  TextWrapper,
  Text,
  Bold,
  Small,
  NoProductMsg,
  NoProductImg,
} from './checkout-two.style';

import { NoCartBag } from 'assets/icons/NoCartBag';

import Sticky from 'react-stickynode';
import { ProfileContext } from 'contexts/profile/profile.context';
import { FormattedMessage } from 'react-intl';
import { useCart } from 'contexts/cart/use-cart';
import { useWindowSize } from 'utils/useWindowSize';
import Schedules from 'features/schedule/schedule';
import Address from 'features/address/address';

import DayPicker from 'react-day-picker';
import { CardHeader } from 'components/card-header/card-header';
import { addOrderItemsToOrder, createOrder } from 'services/order';

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
// The type of props Checkout Form receives
interface MyFormProps {
  token: string;
  deviceType: any;
}

type CartItemProps = {
  product: any;
};

const OrderItem: React.FC<CartItemProps> = ({ product }) => {
  const { id, quantity, title, name, unit, price, salePrice } = product;
  const displayPrice = salePrice ? salePrice : price;
  return (
    <Items key={id}>
      <Quantity>{quantity}</Quantity>
      <Multiplier>x</Multiplier>
      <ItemInfo>
        {name ? name : title} {unit ? `| ${unit}` : ''}
      </ItemInfo>
      <Price>
        {CURRENCY}
        {(displayPrice * quantity).toFixed(2)}
      </Price>
    </Items>
  );
};

const CheckoutWithSidebar: React.FC<MyFormProps> = ({ token, deviceType }) => {
  const { state } = useContext(ProfileContext);
  const {
    items,
    clearCart,
    cartItemsCount,
    calculatePrice,
    calculateDiscount,
    calculateSubTotalPrice,
  } = useCart();
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [selectedDate, setSelectedDate] = useState(tomorrow);
  const [selectedTime, setSelectedTime] = useState('08:00');
  const [selectedAddress, setSelectedAddress] = useState(state.address[0]);
  const size = useWindowSize();

  const handleSubmit = async () => {
    const timeComponent = selectedTime.split(':');
    const datetime = new Date(
      selectedDate.setHours(
        parseInt(timeComponent[0]),
        parseInt(timeComponent[1]),
        0,
        0,
      ),
    );

    setLoading(true);
    const orderItems = items.map((service) => {
      return {
        quantity: service.quantity,
        service: {
          id: service.id,
        },
      };
    });
    const totalPrice = items.reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0);
    const order = {
      address1: selectedAddress.address1,
      address2: selectedAddress.address2,
      postalCode: selectedAddress.postalCode.toString(),
      datetime,
      totalPrice,
    };

    const savedOrder = await createOrder(order);
    await addOrderItemsToOrder(savedOrder, orderItems);
    clearCart();
    Router.push(`/order-received/${savedOrder.id}`);

    setLoading(false);
  };

  useEffect(() => {
    if (calculatePrice() > 0 && cartItemsCount > 0) {
      setIsValid(true);
    }
  }, [state]);

  const handleDayClick = (day) => {
    setSelectedDate(day);
  };

  console.log({ items });

  return (
    <form>
      <CheckoutWrapper>
        <CheckoutContainer>
          <CheckoutInformation>
            {/* DeliveryAddress */}
            <InformationBox>
              <Address
                increment={true}
                flexStart={true}
                buttonProps={{
                  variant: 'text',
                  type: 'button',
                  className: 'addButton',
                }}
                icon={true}
                onSelectAddress={(address) => setSelectedAddress(address)}
              />
            </InformationBox>
            {/* DeliverySchedule */}
            <InformationBox>
              <CardHeader increment={2}>Schedule</CardHeader>
              <DeliverySchedule>
                <DayPicker
                  disabledDays={{
                    before: tomorrow,
                  }}
                  onDayClick={handleDayClick}
                  selectedDays={selectedDate}
                />
                <Schedules
                  duration={(items[0] || {}).durationMinutes || 30}
                  increment={true}
                  onSelect={(time) => setSelectedTime(time)}
                />
              </DeliverySchedule>
            </InformationBox>

            <InformationBox
              className="paymentBox"
              style={{ paddingBottom: 30 }}
            >
              <TermConditionText>
                <FormattedMessage
                  id="termAndConditionHelper"
                  defaultMessage="By making this purchase you agree to our"
                />
                <Link href="#">
                  <TermConditionLink>
                    <FormattedMessage
                      id="termAndCondition"
                      defaultMessage="terms and conditions."
                    />
                  </TermConditionLink>
                </Link>
              </TermConditionText>

              {/* CheckoutSubmit */}
              <CheckoutSubmit>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isValid}
                  size="big"
                  loading={loading}
                  style={{ width: '100%' }}
                >
                  <FormattedMessage
                    id="processCheckout"
                    defaultMessage="Proceed to Checkout"
                  />
                </Button>
              </CheckoutSubmit>
            </InformationBox>
          </CheckoutInformation>

          <CartWrapper>
            <Sticky
              enabled={size.width >= 768 ? true : false}
              top={120}
              innerZ={999}
            >
              <OrderInfo>
                <Title>
                  <FormattedMessage
                    id="cartTitle"
                    defaultMessage="Your Order"
                  />
                </Title>

                <Scrollbar className="checkout-scrollbar">
                  <ItemsWrapper>
                    {cartItemsCount > 0 ? (
                      items.map((item) => (
                        <OrderItem key={`cartItem-${item.id}`} product={item} />
                      ))
                    ) : (
                      <>
                        <NoProductImg>
                          <NoCartBag />
                        </NoProductImg>

                        <NoProductMsg>
                          <FormattedMessage
                            id="noProductFound"
                            defaultMessage="No products found"
                          />
                        </NoProductMsg>
                      </>
                    )}
                  </ItemsWrapper>
                </Scrollbar>

                <CalculationWrapper>
                  <TextWrapper>
                    <Text>
                      <FormattedMessage
                        id="subTotal"
                        defaultMessage="Subtotal"
                      />
                    </Text>
                    <Text>
                      {CURRENCY}
                      {calculateSubTotalPrice()}
                    </Text>
                  </TextWrapper>

                  <TextWrapper>
                    <Text>
                      <FormattedMessage
                        id="intlOrderDetailsDelivery"
                        defaultMessage="Delivery Fee"
                      />
                    </Text>
                    <Text>{CURRENCY}0.00</Text>
                  </TextWrapper>

                  <TextWrapper>
                    <Text>
                      <FormattedMessage
                        id="discountText"
                        defaultMessage="Discount"
                      />
                    </Text>
                    <Text>
                      {CURRENCY}
                      {calculateDiscount()}
                    </Text>
                  </TextWrapper>

                  <TextWrapper style={{ marginTop: 20 }}>
                    <Bold>
                      <FormattedMessage id="totalText" defaultMessage="Total" />{' '}
                      <Small>
                        (
                        <FormattedMessage
                          id="vatText"
                          defaultMessage="Incl. VAT"
                        />
                        )
                      </Small>
                    </Bold>
                    <Bold>
                      {CURRENCY}
                      {calculatePrice()}
                    </Bold>
                  </TextWrapper>
                </CalculationWrapper>
              </OrderInfo>
            </Sticky>
          </CartWrapper>
        </CheckoutContainer>
      </CheckoutWrapper>
    </form>
  );
};

export default CheckoutWithSidebar;
