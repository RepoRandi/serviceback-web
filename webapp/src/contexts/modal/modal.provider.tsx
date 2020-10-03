import dynamic from 'next/dynamic';
import React, { useCallback, useState, useMemo } from 'react';
import { ModalType, ModalContext } from './modal.context';
import { useMedia } from 'utils/use-media';
const SpringModal = dynamic(() =>
  import('components/spring-modal/spring-modal')
);
const CenterModal = dynamic(() => import('components/modal/center-modal'));

/**
 * Modal Provider Props
 */
export interface ModalProviderProps {
  /**
   * Specifies the root element to render modals into
   */
  container?: Element;

  /**
   * Container component for modal nodes
   */
  rootComponent?: React.ComponentType<any>;

  /**
   * Subtree that will receive modal context
   */
  children: React.ReactNode;
}

/**
 * Modal Provider
 *
 * Provides modal context and renders ModalRoot.
 */
export const ModalProvider = ({
  container,
  rootComponent,
  children,
}: ModalProviderProps) => {
  if (container && !(container instanceof HTMLElement)) {
    throw new Error(`Container must specify DOM element to mount modal root into.
    This behavior has changed in 3.0.0. Please use \`rootComponent\` prop instead.
    See: https://github.com/mpontus/react-modal-hook/issues/18`);
  }
  const [modals, setModals] = useState<Record<string, any>>({});
  const showModal = useCallback(
    (key: string, modal: ModalType, options: any = {}) =>
      setModals((prev) => ({
        ...prev,
        [key]: { component: modal, isOpen: true, ...options },
      })),
    []
  );
  const hideModal = useCallback((key: string, onClose: () => void) => {
    setModals((prevConfig) => ({
      ...prevConfig,
      [key]: { ...prevConfig[key], isOpen: false },
    }));
    if (onClose) {
      onClose();
    }
  }, []);
  const contextValue = useMemo<any>(() => ({ showModal, hideModal }), []);
  const isSmall = useMedia('(max-width: 767px)');
  return (
    <ModalContext.Provider value={contextValue}>
      <React.Fragment>
        {children}
        {Object.keys(modals).map((currentKey) => {
          const { component: Component, isOpen, onClose } = modals[currentKey];
          return isSmall ? (
            <SpringModal
              key={currentKey}
              children={<Component />}
              isOpen={isOpen}
              onRequestClose={() => hideModal(currentKey, onClose)}
            />
          ) : (
            <CenterModal
              key={currentKey}
              children={<Component />}
              isOpen={isOpen}
              onRequestClose={() => hideModal(currentKey, onClose)}
            />
          );
        })}
      </React.Fragment>
    </ModalContext.Provider>
  );
};
