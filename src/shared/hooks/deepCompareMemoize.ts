import {useRef} from 'react';
import {isEqual} from 'lodash';

export const useDeepCompareMemoize = (value: any) => {
  const valueRef = useRef();

  if (!isEqual(value, valueRef.current)) {
    valueRef.current = value;
  }
  return valueRef.current;
};
