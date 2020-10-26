import { createContext } from 'react';
import { api, requestApi } from './api';
import { INITIAL_STATE, actionNames, reducer } from './reducer';

const DataContext = createContext();

const color = {
  blue1: '#4285F5',
  black1: '#505050',
  grey1: '#CECECE',
  light_grey: '#ECECEC'
};

const url = {
  HOME: '/',
  SEARCH: (keyword) => `/search/${ keyword || ':keyword' }`,
  LOGIN: '/login'
};

export{
  DataContext,
  color,
  url,
  api,
  requestApi,
  INITIAL_STATE,
  actionNames,
  reducer
}