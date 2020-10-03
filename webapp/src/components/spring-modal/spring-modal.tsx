import React from 'react';
import { useTransition, animated } from 'react-spring';
import { BaseModal } from 'react-spring-modal';
import { CloseIcon } from 'assets/icons/CloseIcon';
// import { useAppState, useAppDispatch } from 'contexts/app/app.provider';
import { Scrollbar } from 'components/scrollbar/scrollbar';

type SpringModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  style?: any;
};

const SpringModal: React.FC<SpringModalProps> = ({
  isOpen,
  onRequestClose,
  children,
  style = {},
}) => {
  // const dispatch = useAppDispatch();
  // const isModalOpen = useAppState('isModalOpen');

  // const onClose = () => {
  //   dispatch({
  //     type: 'TOGGLE_MODAL',
  //   });
  // };

  const transition = useTransition(isOpen, null, {
    from: { transform: 'translateY(100%) translateY(55px) translateX(-50%)' },
    enter: { transform: 'translateY(0%) translateY(0) translateX(-50%)' },
    leave: { transform: 'translateY(100%) translateY(55px) translateX(-50%)' },
  });

  const staticStyles = {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    padding: '0',
    width: 'calc(100% + 1px)',
    height: '100%',
    maxHeight: '70vh',
    backgroundColor: '#ffffff',
    borderRadius: '0px',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    zIndex: 99999,
  };

  const buttonStyle = {
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    color: '#0D1136',
    border: 0,
    outline: 0,
    boxShadow: 'none',
    borderRadius: '50%',
    position: 'absolute' as 'absolute',
    top: -55,
    left: '50%',
    transform: 'translateX(-50%)',
    cursor: 'pointer',

    ':focus': {
      outline: 0,
      boxShadow: 'none',
    },
  };

  const scrollbarStyle = {
    height: '100%',
    maxHeight: '100%',
  };

  return (
    <BaseModal isOpen={isOpen} onRequestClose={onRequestClose}>
      {transition.map(
        ({ item, key, props: transitionStyles }) =>
          item && (
            <animated.div
              key={key}
              style={{ ...transitionStyles, ...staticStyles, ...style }}
            >
              <button
                type='button'
                onClick={onRequestClose}
                style={{ ...buttonStyle }}
              >
                <CloseIcon style={{ width: 12, height: 12 }} />
              </button>
              <Scrollbar style={{ ...scrollbarStyle }}>
                <div style={{ padding: '30px' }}>{children}</div>
              </Scrollbar>
            </animated.div>
          )
      )}
    </BaseModal>
  );
};

export default SpringModal;
