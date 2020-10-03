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
  defaultClose?: boolean;
};

const SpringModal: React.FC<SpringModalProps> = ({
  isOpen,
  onRequestClose,
  children,
  defaultClose = true,
  style = {},
}) => {
  const transition = useTransition(isOpen, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const staticStyles = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 0,
    width: 'calc(100% + 1px)',
    height: '100%',
    maxHeight: '100vh',
    backgroundColor: '#ffffff',
    borderRadius: '0px',
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
    top: 20,
    right: 20,
    zIndex: 100000,
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
              {defaultClose && (
                <button
                  type='button'
                  onClick={onRequestClose}
                  style={{ ...buttonStyle }}
                >
                  <CloseIcon style={{ width: 12, height: 12 }} />
                </button>
              )}
              <Scrollbar style={{ ...scrollbarStyle }}>{children}</Scrollbar>
            </animated.div>
          )
      )}
    </BaseModal>
  );
};

export default SpringModal;
