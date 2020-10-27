import styled, { css } from 'styled-components';

export default styled.ul`
  ${ ({ color }) => css`
    box-sizing: border-box;
    position: absolute;
    top: 46px; right: 0px;
    width: 192px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid ${ color.grey1 };
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    display: flex; flex-wrap: wrap;
    gap: 6px;
    font-size: 14px;
    display: none;

    li{
      width: 80px; height: 74px;
      border-radius: 6px;
      display: flex; flex-direction: column;
      justify-content: center; align-items: center;
      &:hover{ 
        background: ${ color.light_grey };
        cursor: pointer;
      }
    }
  `}
`;