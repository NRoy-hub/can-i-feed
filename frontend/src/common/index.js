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
  light_grey: '#ECECEC',
  light_grey2: '#B7B7B7'
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