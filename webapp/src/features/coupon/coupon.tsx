import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { CouponBoxWrapper, Error } from './coupon.style';
import { Input } from 'components/forms/input';
import { Button } from 'components/button/button';
import useCoupon from 'data/use-coupon';
import { useCart } from 'contexts/cart/use-cart';

type CouponProps = {
  disabled?: any;
  className?: string;
  style?: any;
  errorMsgFixed?: boolean;
};

const Coupon: React.FC<CouponProps> = ({
  disabled,
  className,
  style,
  errorMsgFixed = false,
  ...props
}) => {
  const intl = useIntl();
  const { verifyCoupon } = useCoupon();
  const { applyCoupon } = useCart();
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const handleApplyCoupon = async () => {
    const data: any = await verifyCoupon(code);
    if (data?.discountInPercent) {
      setCode('');
      applyCoupon(data);
    } else {
      setError('Invalid Coupon');
    }
  };
  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCode(e.currentTarget.value);
  };
  return (
    <>
      <CouponBoxWrapper
        className={className ? className : 'boxedCoupon'}
        style={style}
      >
        <Input
          onChange={handleOnChange}
          value={code}
          placeholder={intl.formatMessage({
            id: 'couponPlaceholder',
            defaultMessage: 'Enter Coupon Here',
          })}
          {...props}
        />
        <Button
          type='button'
          onClick={handleApplyCoupon}
          disabled={disabled}
          padding='0 30px'
        >
          <FormattedMessage id='voucherApply' defaultMessage='Apply' />
        </Button>
      </CouponBoxWrapper>
      {error && (
        <Error errorMsgFixed={errorMsgFixed}>
          <FormattedMessage id='couponError' defaultMessage={error} />
        </Error>
      )}
    </>
  );
};

export default Coupon;
