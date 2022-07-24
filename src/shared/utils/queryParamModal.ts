import {URLSearchParamsInit} from 'react-router-dom';

const open = (param: string, setSearchParams: ((nextInit: URLSearchParamsInit, navigateOptions?: ({replace?: boolean | undefined, state?: any} | undefined)) => void)) => {
  setSearchParams({[`modal-${param}`]: 'true'});
};

const close = (param: string, searchParams: URLSearchParams, setSearchParams: ((nextInit: URLSearchParamsInit, navigateOptions?: ({replace?: boolean | undefined, state?: any} | undefined)) => void)) => {
  searchParams.delete(`modal-${param}`);
  setSearchParams(searchParams);
};
const isOpen = (param: string, searchParams: URLSearchParams) =>
  searchParams.get(`modal-${param}`) === 'true';

export const createQueryParamModalHelpers = (param: any, searchParams: URLSearchParams, setSearchParams: ((nextInit: URLSearchParamsInit, navigateOptions?: ({replace?: boolean | undefined, state?: any} | undefined)) => void)) => ({
  open: () => open(param, setSearchParams),
  close: () => close(param, searchParams, setSearchParams),
  isOpen: () => isOpen(param, searchParams),
});
