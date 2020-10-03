import React, { useEffect, useRef } from 'react';
import { openModal, closeModal } from '@redq/reuse-modal';
import Cart from 'features/carts/cart';
import { Button } from 'components/button/button';
import {
  ProductDetailsWrapper,
  ProductPreview,
  ProductInfo,
  BookTitle,
  AuthorName,
  BookDescriptionWrapper,
  BookDescription,
  ButtonText,
  ProductCartWrapper,
  ProductPriceWrapper,
  ProductPrice,
  SalePrice,
  ProductCartBtn,
  DetailsWrapper,
  DetailsTitle,
  Description,
} from './product-details-two.style';
import { CartIcon } from 'assets/icons/CartIcon';
import { CURRENCY } from 'utils/constant';
import { useCart } from 'contexts/cart/use-cart';
import { Counter } from 'components/counter/counter';
import Router from 'next/router';

type ProductDetailsProps = {
  product: any;
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const ProductDetails: React.FunctionComponent<ProductDetailsProps> = ({
  product,
  deviceType,
}) => {
  const { addItem, removeItem, getItem, isInCart, clearCart } = useCart();
  const data = product;
  const handleModal = () => {
    openModal({
      show: true,
      config: {
        className: 'cartPopup',
        width: 'auto',
        height: 'auto',
        enableResizing: false,
        disableDragging: true,
        transition: {
          tension: 360,
          friction: 40,
        },
      },
      closeOnClickOutside: true,
      component: Cart,
      closeComponent: () => <div />,
      componentProps: { onCloseBtnClick: closeModal, scrollbarHeight: 330 },
    });
  };

  const scrollRef = useRef(null);

  const handleChooseQuantity = (e) => {
    e.stopPropagation();
    clearCart();
    addItem(data);
  };

  const handleAddClick = (e) => {
    e.stopPropagation();
    addItem(data);
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    removeItem(data);
  };

  const handleBookAppointment = (e) => {
    e.stopPropagation();
    Router.push('/checkout');
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }, []);

  return (
    <>
      <ProductDetailsWrapper className="product-card">
        <ProductPreview>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-image"
          />
        </ProductPreview>

        <ProductInfo>
          <BookTitle>
            {product.name}
            <span
              style={{
                float: 'right',
                fontSize: '15px',
                marginTop: '2px',
              }}
            >
              &#x25CF; {product.quantityUnit}
            </span>
          </BookTitle>
          <AuthorName>
            <span style={{ color: 'orange', marginRight: '4px' }}>
              {CURRENCY} {product.price}
            </span>
            &#x25CF; {product.cashbackPercent}% Cashback
          </AuthorName>
          <BookDescriptionWrapper>
            <BookDescription>{product.description}</BookDescription>
          </BookDescriptionWrapper>

          <ProductCartWrapper>
            <ProductPriceWrapper>
              {product.cashbackPercent ? (
                <SalePrice>
                  {CURRENCY}
                  {product.price}
                </SalePrice>
              ) : null}

              <ProductPrice>
                {CURRENCY}
                {(
                  parseFloat(product.price) *
                  (1 - parseFloat(product.cashbackPercent) / 100.0)
                ).toFixed(2)}
              </ProductPrice>
            </ProductPriceWrapper>

            <ProductCartBtn>
              {!isInCart(data.id) ? (
                <Button
                  className="cart-button"
                  variant="secondary"
                  borderRadius={100}
                  onClick={handleChooseQuantity}
                >
                  <CartIcon mr={2} />
                  <ButtonText>Choose Quantity</ButtonText>
                </Button>
              ) : (
                <>
                  <Counter
                    value={getItem(data.id).quantity}
                    onDecrement={handleRemoveClick}
                    onIncrement={handleAddClick}
                  />
                  <Button
                    className="cart-button"
                    variant="secondary"
                    borderRadius={100}
                    onClick={handleBookAppointment}
                    marginLeft={'8px'}
                  >
                    <CartIcon mr={2} />
                    <ButtonText>Book Appointment</ButtonText>
                  </Button>
                </>
              )}
            </ProductCartBtn>
          </ProductCartWrapper>
        </ProductInfo>
      </ProductDetailsWrapper>

      <DetailsWrapper ref={scrollRef}>
        <DetailsTitle>WHAT IS INCLUDED</DetailsTitle>
        <Description>{product.additionalDetails}</Description>
      </DetailsWrapper>
    </>
  );
};

export default ProductDetails;
