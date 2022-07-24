import React, {useState, useEffect} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import pubsub from 'sweet-pubsub';
import {uniqueId} from 'lodash';

import {Container, StyledToast, CloseIcon, Title, Message} from './ToastStyle';


interface ToastInfo {
  type: string,
  title: string,
  message: string,
  duration: number,
}

interface ToastState {
  id: string,
  type: string,
  title: string,
  message: string,
}

const Toast = () => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  useEffect(() => {
    const addToast = ({type = 'success', title, message, duration = 5}: ToastInfo) => {
      const id = uniqueId('toast-');
      const newToastState: ToastState = {id, type, title, message};
      setToasts((currentToasts) => [...currentToasts, newToastState]);

      if (duration) {
        setTimeout(() => removeToast(id), duration * 1000);
      }
    };

    pubsub.on('toast', addToast);

    return () => {
      pubsub.off('toast', addToast);
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  };

  return (
    <Container>
      <TransitionGroup>
        {toasts.map((toast) => (
          <CSSTransition key={toast.id} classNames="gdd-toast" timeout={200}>
            <StyledToast key={toast.id} type={toast.type} onClick={() => removeToast(toast.id)}>
              <CloseIcon type="close" />
              {toast.title && <Title>{toast.title}</Title>}
              {toast.message && <Message>{toast.message}</Message>}
            </StyledToast>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Container>
  );
};

export default Toast;
