import React from 'react';
import Router, { useRouter } from 'next/router';
import styled from 'styled-components';
import css from '@styled-system/css';
import { CATEGORY_MENU_ITEMS } from 'site-settings/site-navigation';
import * as categoryMenuIcons from 'assets/icons/category-menu-icons';
import IconNavCard from './type-nav-card';

const CategoryWrapper = styled.div(
  css({
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    // margin: '0 -7.5px',
  })
);

const Col = styled.div(
  css({
    width: '33.333%',
    padding: '0 7.5px',
    marginBottom: 15,

    '@media screen and (min-width: 768px)': {
      width: '25%',
    },
  })
);

const CategoryIcon = ({ name }) => {
  const TagName = categoryMenuIcons[name];
  return !!TagName ? <TagName /> : <p>Invalid icon {name}</p>;
};

const CategoryIconNav = (props: any) => {
  const router = useRouter();

  const handleOnClick = (item) => {
    if (item.dynamic) {
      Router.push('/[type]', `${item.href}`);
      return;
    }
    Router.push(`${item.href}`);
  };

  return (
    <CategoryWrapper>
      {CATEGORY_MENU_ITEMS.map((item) => (
        <Col key={item.id}>
          <IconNavCard
            onClick={() => handleOnClick(item)}
            icon={<CategoryIcon name={item.icon} />}
            intlId={item.id}
            defaultMessage={item.defaultMessage}
            active={
              router.pathname === item.href || router.asPath === item.href
            }
            {...props}
          />
        </Col>
      ))}
    </CategoryWrapper>
  );
};
export default CategoryIconNav;
