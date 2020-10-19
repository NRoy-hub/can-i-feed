import styled from 'styled-components';
import { color } from '../../common';

export default styled.header`
  padding-top: 10px;

  nav{
    display: flex;
    justify-content: space-between;
    font-size: 20px;
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
`;