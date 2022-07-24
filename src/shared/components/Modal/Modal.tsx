import React, {Fragment, useState, useRef, useEffect, useCallback} from 'react';
import ReactDOM from 'react-dom';

import useOnOutsideClick from '../../hooks/onOutsideClick';
import useOnEscapeKeyDown from '../../hooks/onEscapeKeyDown';

import {ScrollOverlay, ClickableOverlay, StyledModal, CloseIcon} from './ModalStyles';

interface IModalProps {
  className: string | undefined,
  testId: string,
  variant:'center' | 'aside',
  width: number,
  withCloseIcon: boolean,
  isOpen: boolean | undefined,
  onClose: (() => void),
  renderLink: ((open: any) => void),
  renderContent: ((open: any) => void),
};

const Modal = (props : IModalProps & any) => {
  const [stateIsOpen, setStateOpen] = useState(false);
  const isControlled = typeof props.isOpen === 'boolean';
  const isOpen = isControlled ? props.isOpen : stateIsOpen;

  const $modalRef = useRef();
  const $clickableOverlayRef = useRef();

  const closeModal = useCallback(() => {
    if (!isControlled) {
      setStateOpen(false);
    } else {
      props.onClose();
    }
  }, [isControlled, props.onClose]);

  useOnOutsideClick($modalRef, isOpen, closeModal, $clickableOverlayRef);
  useOnEscapeKeyDown(isOpen, closeModal);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isOpen]);

  return (
    <Fragment>
      {!isControlled && props.renderLink({open: () => setStateOpen(true)})}

      {isOpen &&
                ReactDOM.createPortal(
                    <ScrollOverlay>
                      <ClickableOverlay variant={props.variant} ref={$clickableOverlayRef}>
                        <StyledModal
                          className={props.className}
                          variant={props.variant}
                          width={props.width}
                          data-testid={props.testId}
                          ref={$modalRef}
                        >
                          {props.withCloseIcon && <CloseIcon type="close" variant={props.variant} onClick={closeModal} />}
                          {props.renderContent({close: closeModal})}
                        </StyledModal>
                      </ClickableOverlay>
                    </ScrollOverlay>,
                    // @ts-ignore
                    $root,
                )}
    </Fragment>
  );
};

const $root = document.getElementById('root');

export default Modal;
