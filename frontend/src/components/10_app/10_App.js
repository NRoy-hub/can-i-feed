import React, { useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './11_Router';
import { actionNames, DataContext, INITIAL_STATE, reducer } from 'common';
import StyledDiv from 'style/10_app/10_App';

export default function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  !dispatch.loadOn && (dispatch.loadOn = () => dispatch({ type: actionNames.loadOn }));
  !dispatch.loadOff && (dispatch.loadOff = () => dispatch({ type: actionNames.loadOff }));
  

  return (
    <StyledDiv className="app">
      <BrowserRouter>
        <DataContext.Provider value={{ state, dispatch }}>
          <Router />
        </DataContext.Provider>
      </BrowserRouter>
    </StyledDiv>
  );
}