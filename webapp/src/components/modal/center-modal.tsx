import React, { Fragment } from 'react';
import { useTransition, animated } from 'react-spring';
import { BaseModal } from 'react-spring-modal';
import { CloseIcon } from 'assets/icons/CloseIcon';
import { Scrollbar } from 'components/scrollbar/scrollbar';

type SpringModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  style?: any;
};

const CenterModal: React.FC<SpringModalProps> = ({
  isOpen,
  onRequestClose,
  children,
  style = {},
}) => {
  const transition = useTransition(isOpen, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const staticStyles = {
    padding: 0,
    maxWidth: 'calc(100% - 30px)',
    height: 'auto',
    maxHeight: 'calc(100vh - 30px)',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    display: 'flex',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 99999,
  };

  const buttonStyle = {
    width: 35,
    height: 35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    color: '#0D1136',
    border: 0,
    outline: 0,
    boxShadow: 'none',
    borderRadius: '50%',
    position: 'fixed' as 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 100000,
    cursor: 'pointer',

    ':focus': {
      outline: 0,
      boxShadow: 'none',
    },
  };

  const scrollbarStyle = {
    height: '100%',
    width: '100%',
    // maxHeight: 'calc(100vh - 30px)',
  };

  return (
    <BaseModal isOpen={isOpen} onRequestClose={onRequestClose}>
      {transition.map(
        ({ item, key, props: transitionStyles }) =>
          item && (
            <Fragment key={key}>
              <animated.div style={{ ...transitionStyles }}>
                <button
                  type='button'
                  onClick={onRequestClose}
                  style={{ ...buttonStyle }}
                >
                  <CloseIcon style={{ width: 11, height: 11 }} />
                </button>
              </animated.div>

              <animated.div
                key={key}
                style={{ ...transitionStyles, ...staticStyles, ...style }}
              >
                <Scrollbar style={{ ...scrollbarStyle }}>{children}</Scrollbar>
              </animated.div>
            </Fragment>
          )
      )}
    </BaseModal>
  );
};

export default CenterModal;
