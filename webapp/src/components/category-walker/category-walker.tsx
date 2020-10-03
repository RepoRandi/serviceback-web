import React, { useState, useEffect } from 'react';
import {
  WalkerWrapper,
  Category,
  IconWrapper,
  NoCategory,
  CategoryWrapper,
} from './category-walker.style';
import { Button } from 'components/button/button';
import { ArrowNext } from 'assets/icons/ArrowNext';
import SpringModal from 'components/spring-modal/spring-modal';
import { useRouter } from 'next/router';
// import { TreeMenu } from 'components/tree-menu/tree-menu';
import startCase from 'lodash/startCase';

type WalkerProps = {
  parent?: string;
  child?: string;
  // onClick: () => void;
};

const CategoryWalker: React.FunctionComponent<WalkerProps> = ({
  parent,
  child,
  children,
}) => {
  const [isOpen, setOpen] = useState(false);
  const { query } = useRouter();
  return (
    <WalkerWrapper>
      <CategoryWrapper>
        {query.category ? (
          <Category>{startCase(query.category as string)}</Category>
        ) : (
          <NoCategory>No Category Selected</NoCategory>
        )}

        {/* <IconWrapper>
          <ArrowNext width="13px" />
        </IconWrapper>
        <Category>{child}</Category> */}
      </CategoryWrapper>

      <Button variant='text' onClick={() => setOpen(true)}>
        See All
      </Button>
      <SpringModal isOpen={isOpen} onRequestClose={() => setOpen(false)}>
        {children}
      </SpringModal>
    </WalkerWrapper>
  );
};

export default CategoryWalker;
