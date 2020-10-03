import React, { useCallback } from 'react';
import { openModal, closeModal } from '@redq/reuse-modal';
import { FormattedMessage } from 'react-intl';
import {
  Box,
  Image,
  Content,
  Title,
  ContentRow,
  Description,
  SearchWrapper,
} from './banner.style';
import { Waypoint } from 'react-waypoint';
import { useAppDispatch } from 'contexts/app/app.provider';
import Search from 'features/search/search';
import { LongArrowLeft } from 'assets/icons/LongArrowLeft';
import {
  SearchModalWrapper,
  SearchModalClose,
} from 'layouts/header/header.style';
import SearchResults from 'features/search/search-results';

interface Props {
  imageUrl: string;
}

export const MobileBanner: React.FC<Props> = ({ imageUrl = '' }) => {
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
    <Box display={['flex', 'flex', 'none']}>
      <Image backgroundImage={`url(${imageUrl})`} />
      <Content>
        <ContentRow style={{ marginBottom: '0px' }}>
          <Title style={{ textAlign: 'left' }}>
            <FormattedMessage
              id="main.bannerTitle"
              defaultMessage="Set Your Title Through Language File"
              values={{ br: <br /> }}
            />
            <span style={{ color: '#DE3163', fontWeight: 'bolder' }}>
              <FormattedMessage
                id="main.bannerTitle.cashback"
                defaultMessage="Set Your Title Through Language File"
              />
            </span>
          </Title>
        </ContentRow>
        <ContentRow>
          <Description>
            <FormattedMessage
              id="main.bannerDescription"
              defaultMessage="Set Your Description Through Language File"
            />
          </Description>
        </ContentRow>

        <SearchWrapper onClick={handleSearchModal}>
          <Search minimal={true} disabled />
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
