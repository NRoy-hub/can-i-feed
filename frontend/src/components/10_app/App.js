import React, { useReducer } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from './Container';
import { actionNames, DataContext, INITIAL_STATE, reducer } from '../../common';
import styled from 'styled-components';

export default function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  !dispatch.loadOn && (dispatch.loadOn = () => dispatch({ type: actionNames.loadOn }));
  !dispatch.loadOff && (dispatch.loadOff = () => dispatch({ type: actionNames.loadOff }));

  return (
    <StyledDiv>
      <Router>
        <DataContext.Provider value={{ state, dispatch }}>
          <Container />
        </DataContext.Provider>
      </Router>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  width: 100vw;
  min-width: 720px;
  display: flex;
  justify-content: center;
  color: #2a2a2a;
`;