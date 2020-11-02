import styled, { css, keyframes } from 'styled-components';

const appearAnimation = keyframes`
  from{ opacity: 0; }
  to{ opacity: 1; }
`;


export default styled.label`
  position: relative;
  box-sizing: border-box;
  width: 96px;
  height: 96px;
  overflow: hidden;
  border: 1px solid #DADADA;
  border-radius: 48px;
  cursor: pointer;

  &:hover .hover_camera{
    animation: ${ appearAnimation } .1s ease-in-out;
  }
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .hover_camera{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 30px;
    background: rgba(112, 112, 112, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    img{ 
      width: 16px;
      height: 14px;
    }
  }
  &:hover .hover_camera{
    opacity: 1;
  }
`;