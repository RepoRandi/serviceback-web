// product card for furniture
import dynamic from 'next/dynamic';
import React from 'react';
import Image from 'components/image/image';
import {
  ProductName,
  DiscountPercent,
  ProductCardWrapper,
  ProductImageWrapper,
  ProductInfo,
} from '../product-card.style';
import { useModal } from 'contexts/modal/use-modal';
import { useRouter } from 'next/router';
const QuickViewMobile = dynamic(() =>
  import('features/quick-view/quick-view-mobile')
);
type ProductCardProps = {
  title: string;
  image: any;
  discountInPercent?: number;
  data: any;
  deviceType: any;
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  image,
  discountInPercent,
  data,
  deviceType,
}) => {
  const router = useRouter();
  const [showModal, hideModal] = useModal(
    () => (
      <QuickViewMobile
        modalProps={data}
        hideModal={hideModal}
        deviceType={deviceType}
      />
    ),
    {
      onClose: () => {
        const { pathname, query, asPath } = router;
        const as = asPath;
        router.push(
          {
            pathname,
            query,
          },
          as,
          {
            shallow: true,
          }
        );
      },
    }
  );
  const handleQuickViewModal = () => {
    const { pathname, query } = router;
    const as = `/product/${data.slug}`;
    if (pathname === '/product/[slug]') {
      router.push(pathname, as);
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
      return;
    }
    showModal();
    router.push(
      {
        pathname,
        query,
      },
      {
        pathname: as,
      },
      {
        shallow: true,
      }
    );
  };
  return (
    <ProductCardWrapper
      onClick={handleQuickViewModal}
      className="furniture-card"
    >
      <ProductImageWrapper>
        <Image
          url={image}
          className="product-image"
          style={{ position: 'relative' }}
          alt={title}
        />
        {discountInPercent ? (
          <DiscountPercent>{discountInPercent}%</DiscountPercent>
        ) : null}
      </ProductImageWrapper>
      <ProductInfo>
        <ProductName>{title}</ProductName>
      </ProductInfo>
    </ProductCardWrapper>
  );
};

export default ProductCard;
