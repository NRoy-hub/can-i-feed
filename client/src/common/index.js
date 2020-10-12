import { createContext } from 'react';
import { api, requestApi } from './api';
import { INITIAL_STATE, actionNames, reducer } from './reducer';

const DataContext = createContext();

const color = {
  black: '#2a2a2a',
  grey: '#B7C2D8',
  blue1: '#3458A1',
  blue2: '#5E88DE',
  blue3: '#D9E6FF',
  blue4: '#77A4FF',
  red: '#FF7793'
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