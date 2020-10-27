import React, { useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { actionNames, DataContext, INITIAL_STATE, reducer } from 'common';
import styled from 'styled-components';

export default function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  !dispatch.loadOn && (dispatch.loadOn = () => dispatch({ type: actionNames.loadOn }));
  !dispatch.loadOff && (dispatch.loadOff = () => dispatch({ type: actionNames.loadOff }));

  return (
    <StyledDiv>
      <BrowserRouter>
        <DataContext.Provider value={{ state, dispatch }}>
          <Router />
        </DataContext.Provider>
      </BrowserRouter>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  color: #2a2a2a;
`;