import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { openModal, closeModal } from '@redq/reuse-modal';
import {
  Box,
  Image,
  Content,
  Title,
  Description,
  SearchWrapper,
} from './banner.style';
import { LongArrowLeft } from 'assets/icons/LongArrowLeft';
import {
  SearchModalWrapper,
  SearchModalClose,
} from 'layouts/header/header.style';

import { Waypoint } from 'react-waypoint';
import { useAppDispatch } from 'contexts/app/app.provider';
import Search from 'features/search/search';
import SearchResults from 'features/search/search-results';

interface Props {
  imageUrl: string;
}

export const Banner: React.FC<Props> = ({ imageUrl = '' }) => {
  const dispatch = useAppDispatch();
  const setSticky = useCallback(() => dispatch({ type: 'SET_STICKY' }), [
    dispatch,
  ]);
  const removeSticky = useCallback(() => dispatch({ type: 'REMOVE_STICKY' }), [
    dispatch,
  ]);
  const onWaypointPositionChange = ({ currentPosition }) => {
    if (!currentPosition || currentPosition === 'above') {
      setSticky();
    }
  };

  const SearchModal: React.FC<{}> = () => {
    return (
      <>
        <SearchModalWrapper>
          <SearchModalClose type="submit" onClick={() => closeModal()}>
            <LongArrowLeft />
          </SearchModalClose>
          <Search className="header-modal-search" showButtonText={false} />
        </SearchModalWrapper>
        <SearchResults />
      </>
    );
  };

  const handleSearchModal = () => {
    openModal({
      show: true,
      config: {
        enableResizing: false,
        disableDragging: true,
        className: 'search-modal-mobile',
        width: '100%',
        height: '100%',
      },
      closeOnClickOutside: false,
      component: SearchModal,
      closeComponent: () => <div />,
    });
  };

  return (
    <Box display={['none', 'none', 'flex']}>
      <Image backgroundImage={`url(${imageUrl})`} />
      <Content>
        <Title>
          <FormattedMessage
            id="main.bannerTitle"
            defaultMessage="Set Your Title Through Language File"
            values={{ br: ' ' }}
          />
          <span style={{ color: '#DE3163', fontWeight: 'bolder' }}>
            <FormattedMessage
              id="main.bannerTitle.cashback"
              defaultMessage="Set Your Title Through Language File"
            />
          </span>
        </Title>
        <Description>
          <FormattedMessage
            id="main.bannerDescription"
            defaultMessage="Set Your Description Through Language File"
          />
        </Description>
        <SearchWrapper onClick={handleSearchModal}>
          <Search
            className="banner-search"
            shadow="0 21px 36px rgba(0,0,0,0.05)"
            disabled
          />
          {/* <SearchResults /> */}
        </SearchWrapper>
        <Waypoint
          onEnter={removeSticky}
          onLeave={setSticky}
          onPositionChange={onWaypointPositionChange}
        />
      </Content>
    </Box>
  );
};
