import styled from 'styled-components';
import { color, keyframs } from '../../common';

export default styled.header`
  width: 100%;
  padding: 11px 40px;
  display: flex; justify-content: space-between; align-items: flex-start;

  .icon{
    width: 36px; height: 36px;
    display: flex; justify-content: center; align-items: center;
    border-radius: 18px;

    &:hover{ cursor: pointer; }
    &--home{
      width: 40px;
      visibility: hidden;
    }
    &--me img{
      width: 100%; height: 100%;
    }
  }
  .me_container{
    position: relative;
    display: none;

    .icon--me{
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
      overflow: hidden;
    }

    .links{
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
  }

  }
  .login_button{
    padding: 9px 13px;
    background: ${ color.blue1 };
    border-radius: 3px;
    color: white;
    font-size: 14px;

    &:hover{ cursor: pointer; }
  }
  .middle_container{
    display: flex; flex-direction: column; align-items: center;
    padding-top: 90px;

    .cover_image{
      width: 400px; height: 266px;
      overflow: hidden;
    }
    .cover_image img{ 
      width: 430px; height: 286px;
    }
  }
`;