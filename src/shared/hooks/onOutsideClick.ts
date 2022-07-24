import {useEffect, useRef} from 'react';

import {useDeepCompareMemoize} from './deepCompareMemoize';

const useOnOutsideClick = (
    $ignoredElementRefs: any,
    isListening: any = null,
    onOutsideClick: () => void,
    $listeningElementRef: any = null,
) => {
  const $mouseDownTargetRef = useRef();
  const $ignoredElementRefsMemoized = useDeepCompareMemoize([$ignoredElementRefs].flat());

  useEffect(() => {
    const handleMouseDown = (event: { target: any; }) => {
      $mouseDownTargetRef.current = event.target;
    };

    const handleMouseUp = (event: MouseEvent) => {
      // @ts-ignore
      const isAnyIgnoredElementAncestorOfTarget = $ignoredElementRefsMemoized.some(
          ($elementRef: { current: { contains: (arg0: EventTarget | null | undefined) => any; }; }) =>
            $elementRef.current.contains($mouseDownTargetRef.current) ||
                    $elementRef.current.contains(event.target),
      );
      if (event.button === 0 && !isAnyIgnoredElementAncestorOfTarget) {
        onOutsideClick();
      }
    };

    const $listeningElement = ($listeningElementRef || {}).current || document;

    if (isListening) {
      $listeningElement.addEventListener('mousedown', handleMouseDown);
      $listeningElement.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      $listeningElement.removeEventListener('mousedown', handleMouseDown);
      $listeningElement.removeEventListener('mouseup', handleMouseUp);
    };
  }, [$ignoredElementRefsMemoized, $listeningElementRef, isListening, onOutsideClick]);
};

export default useOnOutsideClick;
