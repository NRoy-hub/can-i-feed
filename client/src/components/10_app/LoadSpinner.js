import React from 'react';
import styled, { keyframes } from 'styled-components';
import spinnerImage from '../../images/spinner.png';

export default function LoadSpinner(){
  return(
    <StyledDiv>
      <img src={ spinnerImage } alt="load_spinner"/>
    </StyledDiv>
  );
}

const rotate = keyframes`
  from{ transform: rotate(0deg); }
  to{ transform: rotate(360deg); }
`;

const StyledDiv = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;

  & img{
    width: 70px;
    height: 70px;
    opacity: 0.6;
    animation: ${ rotate } 1s linear infinite;
  }
`;