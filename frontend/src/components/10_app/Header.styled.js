import styled from 'styled-components';
import { color } from '../../common';

export default styled.header`
  padding-top: 10px;
  font-size: 20px;

  nav{
    display: flex;
    justify-content: space-between;
    color: white;
  }

  .pane{
    display: flex;
    position: relative;
  }

  .pane > *{
    padding: 14px 20px;
    background: ${ color.grey };
    
    &:hover{
      cursor: pointer;
    }
    &:not(:first-child){
      margin-left: 3px;
    }
    &.active{
      background: ${ color.blue1 };
    }
  }

  .email{
    width: 100%;
    background: white;
    border: 1px solid ${ color.blue1 };
    color: ${ color.blue1 };
  }

  @media screen and (max-width: 720px){
    font-size: 16px;
    .pane > *{
      padding: 10px;
    }
  }
`;