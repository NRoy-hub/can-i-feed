import styled, { css, keyframes } from 'styled-components';

const appearMenus = keyframes`
  from{
    transform: scale(0.6) translateY(-100px) translateX(50px);
    opacity: 0;
  }
  to{
    transform: scale(1) translateY(0);
    opacity: 1;
  }
`;

export default styled.ul`
  ${ ({ color }) => css`
    box-sizing: border-box;
    position: absolute;
    top: 46px; 
    right: 0px;
    width: 192px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #CECECE;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    background: white;
    display: flex; 
    flex-wrap: wrap;
    gap: 6px;
    font-size: 14px;
    animation: ${ appearMenus } 0.2s ease-in-out;

    li{
      width: 80px; 
      height: 74px;
      border-radius: 6px;
      display: flex; 
      flex-direction: column;
      justify-content: center; 
      align-items: center;
      &:hover{ 
        background: ${ color.light_grey };
        cursor: pointer;
      }
    }
  `}
`;