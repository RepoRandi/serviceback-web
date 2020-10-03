import { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { ModalContext, ModalType } from './modal.context';

/**
 * Callback types provided for descriptive type-hints
 */
type ShowModal = () => void;
type HideModal = () => void;

/**
 * Utility function to generate unique number per component instance
 */
const generateModalKey = (() => {
  let count = 0;

  return () => `${++count}`;
})();

/**
 * Check whether the argument is a stateless component.
 *
 * We take advantage of the stateless nature of functional components to be
 * inline the rendering of the modal component as part of another immutable
 * component.
 *
 * This is necessary for allowing the modal to update based on the inputs passed
 * as the second argument to useModal without unmounting the previous version of
 * the modal component.
 */
const isFunctionalComponent = (Component: Function) => {
  const prototype = Component.prototype;

  return !prototype || !prototype.isReactComponent;
};

/**
 * React hook for showing modal windows
 */
export const useModal = (
  component: ModalType,
  options: any = {}
): [ShowModal, HideModal] => {
  if (!isFunctionalComponent(component)) {
    throw new Error(
      'Only stateless components can be used as an argument to useModal. You have probably passed a class component where a function was expected.'
    );
  }

  const key = useMemo(generateModalKey, []);
  const modal = useMemo(() => component, options.inputs);
  const context = useContext(ModalContext);
  const showModal = useCallback(() => context.showModal(key, modal, options), [
    context.showModal,
  ]);
  const hideModal = useCallback(() => context.hideModal(key), [
    context.hideModal,
    key,
  ]);
  // const [isShown, setShown] = useState<boolean>(false);
  // const showModal = useCallback(() => setShown(true), []);
  // const hideModal = useCallback(() => setShown(false), []);

  // useEffect(() => {
  //   if (isShown) {
  //     context.showModal(key, modal);
  //   } else {
  //     context.hideModal(key);
  //   }

  //   // Hide modal when parent component unmounts
  //   return () => context.hideModal(key);
  // }, [modal, isShown]);

  return [showModal, hideModal];
};

// export default useModal;

/// uses
// import useModal from "use-modal";
// import ModalProvider from "modal.provider";
// import Modal from "react-modal"; // It can be any modal

// const MyModal = memo(
//   ({ isOpen, onClose, title, description, closeBtnLabel }) => (
//     <Modal isOpen={isOpen} onRequestClose={onClose}>
//       <h2>{title}</h2>
//       <div>{description}</div>
//       <button onClick={onClose}>{closeBtnLabel}</button>
//     </Modal>
//   )
// );

// const SomePage = memo(() => {
//   const [showModal, hideModal] = useModal(MyModal, {
//     title: "My Test Modal",
//     description: "I Like React Hooks",
//     closeBtnLabel: "Close"
//   });

//   return (
//     <>
//       <h1>Test Page</h1>
//       <button onClick={showModal}>Show Modal</button>
//     </>
//   );
// });

// const App = () => (
//   <ModalProvider>
//     <SomePage />
//   </ModalProvider>
// );

// useModal(<ModalComponent: Function|>, <modalProps: Object>, <onClose: Function>): [showModal: Function, hideModal: Function]
// Param	Type	Description
// ModalComponent	Function	It can be any react component that you want to use for show modal
// modalProps	Object	Props that you want to pass to your modal component
// showModal	Function	It is function for show your modal, you can pass any dynamic props to this function
// hideModal	Function	It is function for hide your modal, you can pass any dynamic props to this function
// onClose	Function	It callback will be triggered after modal window closes
// showModal(dynamicModalProps: Object)
// Param	Type	Description
// dynamicModalProps	Object	Dynamic props that you want to pass to your modal component
