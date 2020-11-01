import { createContext } from 'react';
import { api, requestApi } from './api';
import { INITIAL_STATE, actionNames, reducer } from './reducer';

const DataContext = createContext();

const color = {
  blue: '#4285F5',
  deep_blue: '#1A73E8',
  green: '#34A853',
  red: '#DF473A',
  grey: '#6B6B6B',
  grey2: '#ACACAC',
  grey3: '#CECECE',
  grey4: '#707070',
  light_grey: '#ECECEC',
  light_grey2: '#B7B7B7'
};

const url = {
  HOME: '/',
  SEARCH: (keyword) => `/search/${ keyword || ':keyword' }`,
  LOGIN: '/login'
};

const speakOutType = {
  RECOMMEND: 1,
  NONRECOMMEND: 2
};

const didClickeOutside = (clickEvent, ref) => {
  const { top, left, right, bottom } = ref.getBoundingClientRect();
  const { clientX: x, clientY: y } = clickEvent;
  return x < left || right < x || y < top || bottom < y;
}

const getCookiesObject = () => {
  const { cookie } = document;
  if(!(!!cookie))return {};

  const result = cookie.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');
    prev[name] = value;
    return prev
  }, {});

  return result;
}

export{
  DataContext,
  color,
  url,
  api,
  requestApi,
  INITIAL_STATE,
  actionNames,
  reducer,
  didClickeOutside,
  speakOutType,
  getCookiesObject
}