import React, {Fragment, useState, useRef, useLayoutEffect} from 'react';
import ReactDOM from 'react-dom';

import useOnOutsideClick from '../../hooks/onOutsideClick';

import {StyledTooltip} from './TooltipStyles';

export interface IToolTip {
  className: string,
  placement: 'top' | 'right' | 'bottom' | 'left',
  offset: {
    top: number,
    left: number,
  },
  width: number,
  renderLink: Function,
  renderContent: Function,
};

const defaultProps = {
  className: undefined,
  placement: 'bottom',
  offset: {
    top: 0,
    left: 0,
  },
};

const Tooltip = ({className, placement, offset, width, renderLink, renderContent}: IToolTip) => {
  const [isOpen, setIsOpen] = useState(false);

  const $linkRef = useRef();
  const $tooltipRef = useRef();

  const openTooltip = () => setIsOpen(true);
  const closeTooltip = () => setIsOpen(false);

  useOnOutsideClick([$tooltipRef, $linkRef], isOpen, closeTooltip);

  useLayoutEffect(() => {
    const setTooltipPosition = () => {
      const {top, left} = calcPosition(offset, placement, $tooltipRef, $linkRef);
      // @ts-ignore
      $tooltipRef.current.style.top = `${top}px`;
      // @ts-ignore
      $tooltipRef.current.style.left = `${left}px`;
    };

    if (isOpen) {
      setTooltipPosition();
      window.addEventListener('resize', setTooltipPosition);
      window.addEventListener('scroll', setTooltipPosition);
    }

    return () => {
      window.removeEventListener('resize', setTooltipPosition);
      window.removeEventListener('scroll', setTooltipPosition);
    };
  }, [isOpen, offset, placement]);

  return (
    <Fragment>
      {renderLink({ref: $linkRef, onClick: isOpen ? closeTooltip : openTooltip})}

      {isOpen &&
                ReactDOM.createPortal(
                    // @ts-ignore
                    <StyledTooltip className={className} ref={$tooltipRef} width={width}>
                      {renderContent({close: closeTooltip})}
                    </StyledTooltip>,
                    // @ts-ignore
                    $root,
                )}
    </Fragment>
  );
};


const calcPosition = (offset: { top: number; left: number; }, placement: string, $tooltipRef: React.MutableRefObject<any>, $linkRef: React.MutableRefObject<any>) => {
  const margin = 10;
  const finalOffset = {...defaultProps.offset, ...offset};

  const tooltipRect = $tooltipRef.current.getBoundingClientRect();
  const linkRect = $linkRef.current.getBoundingClientRect();

  const linkCenterY = linkRect.top + linkRect.height / 2;
  const linkCenterX = linkRect.left + linkRect.width / 2;

  const placements = {
    top: {
      top: linkRect.top - margin - tooltipRect.height,
      left: linkCenterX - tooltipRect.width / 2,
    },
    right: {
      top: linkCenterY - tooltipRect.height / 2,
      left: linkRect.right + margin,
    },
    bottom: {
      top: linkRect.bottom + margin,
      left: linkCenterX - tooltipRect.width / 2,
    },
    left: {
      top: linkCenterY - tooltipRect.height / 2,
      left: linkRect.left - margin - tooltipRect.width,
    },
  };

  type ObjectKey = keyof typeof placements;

  return {
    top: placements[placement as ObjectKey].top + finalOffset.top,
    left: placements[placement as ObjectKey].left + finalOffset.left,
  };
};

const $root = document.getElementById('root');

Tooltip.defaultProps = defaultProps;

export default Tooltip;
