import { openModal } from '@redq/reuse-modal';

// Add or edit modal
export const handleModal = (
  modalComponent: any,
  modalProps = {},
  className: string = 'add-address-modal'
) => {
  openModal({
    show: true,
    config: {
      width: 360,
      height: 'auto',
      enableResizing: false,
      disableDragging: true,
      className: className,
    },
    closeOnClickOutside: true,
    component: modalComponent,
    componentProps: { item: modalProps },
  });
};
