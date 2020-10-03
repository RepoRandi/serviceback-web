import React, { useState } from 'react';
import { useRouter } from 'next/router';
import FoodCard from 'components/product-card/product-card-four/product-card-four';
import {
  ProductsRow,
  ProductsCol,
  ButtonWrapper,
  LoaderWrapper,
  LoaderItem,
  ProductCardWrapper,
} from '../product-list/product-list.style';
import { Button } from 'components/button/button';
import Placeholder from 'components/placeholder/placeholder';
import Fade from 'react-reveal/Fade';
import NoResultFound from 'components/no-result/no-result';

import { customerDistance } from 'utils/customerDistance';
import { formatTime } from 'utils/formatTime';
import { FormattedMessage } from 'react-intl';
import useVendors from 'data/use-vendors';
import ErrorMessage from 'components/error-message/error-message';

type ProductsProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  type: string;
  fetchLimit?: number;
  loadMore?: boolean;
};
export const Products: React.FC<ProductsProps> = ({
  deviceType,
  type,
  fetchLimit = 8,
  loadMore = true,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data, error } = useVendors({
    type: type,
    text: router.query.text,
    category: router.query.category,
    offset: 0,
    limit: fetchLimit,
  });
  if (error) return <ErrorMessage message={error.message} />;

  if (!data) {
    return (
      <LoaderWrapper>
        <LoaderItem>
          <Placeholder uniqueKey="1" />
        </LoaderItem>
        <LoaderItem>
          <Placeholder uniqueKey="2" />
        </LoaderItem>
        <LoaderItem>
          <Placeholder uniqueKey="3" />
        </LoaderItem>
      </LoaderWrapper>
    );
  }

  if (data.length === 0) {
    return <NoResultFound />;
  }
  const handleLoadMore = () => {
    setLoading(true);
    //fetch call here
    setLoading(false);
  };

  return (
    <>
      <ProductsRow>
        {data?.map((item: any, index: number) => (
          <ProductsCol key={index} className="food-col">
            <ProductCardWrapper>
              <Fade
                duration={800}
                delay={index * 10}
                style={{ height: '100%' }}
              >
                <FoodCard
                  name={item.name}
                  image={item.thumbnailUrl}
                  restaurantType={item?.categories.join(', ')}
                  duration={formatTime(customerDistance())}
                  delivery={item.deliveryDetails.charge}
                  isFree={item.deliveryDetails.isFree}
                  discountInPercent={item.promotion}
                  data={item}
                  onClick={() =>
                    router.push(
                      '/restaurant/[slug]',
                      `/restaurant/${item.slug}`
                    )
                  }
                />
              </Fade>
            </ProductCardWrapper>
          </ProductsCol>
        ))}
      </ProductsRow>
      {loadMore && data?.hasMore && (
        <ButtonWrapper>
          <Button
            onClick={handleLoadMore}
            loading={loading}
            variant="secondary"
            border="1px solid #f1f1f1"
          >
            <FormattedMessage id="loadMoreButton" defaultMessage="Load More" />
          </Button>
        </ButtonWrapper>
      )}
    </>
  );
};
export default Products;
