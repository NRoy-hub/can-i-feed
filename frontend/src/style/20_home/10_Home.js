import styled, { css } from 'styled-components';

export default styled.section`
  ${ ({ color }) => css`
    display: flex;
    justify-content: center;
    padding-top: 39px;

    .active_button{
      padding: 10px 14px;
      font-size: 14px;
      color: #6B6B6B;

      &:hover{
        cursor: pointer;
        text-decoration: underline;
      }
    }
    .keyword_board{
      position: absolute;
      left: calc(50vw - 350px);
      bottom: 0;
      width: 700px;
      height: 661px;
      box-sizing: border-box;
      border: 1px solid #B2B2B2;
      border-bottom: 0;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
      background: white;
      padding: 60px 20px;
      /* transform: translateY(631px); */

      .close_button{
        position: absolute;
        top: 12px;
        right: 20px;
        padding: 9px;
        &:hover{ cursor: pointer; }
      }
      .tabs{
        width: 100%;
        display: flex;
        gap: 30px;
        font-size: 18px;
      }
      .tab{
        flex: 1;
        display: flex;
        justify-content: center;
        padding: 7px 0;
        border-radius: 20px;
        &:hover{ cursor: pointer; }
        &.selected{ background: ${ color.light_grey }; }
      }
      .rankings{
        margin-top: 15px;
        display: flex;
        align-items: center;
      }
      .ranking{
        margin-left: 10px;
        padding: 7px 10px;
        color: ${ color.light_grey2 };

        &.selected{
          color: inherit;
          font-weight: bold;
        }
        &::before{
          display: inline-block;
          width: 4px;
          height: 4px;
          margin-right: 10px;
          margin-bottom: 4px;
          border-radius: 4px;
          background: ${ color.light_grey };
          content: "";
        }
        &.selected::before{
          margin-bottom: 2px;
          width: 7px;
          height: 7px;
          background: ${ color.blue };
        }
        &:hover{ cursor: pointer; }
      }

      .keywords{
        margin-top: 25px;
        padding: 0 30px;
        font-size: 18px;
        font-weight: bold;

        li{
          width: 100%;
          margin-bottom: 15px; 
          padding-bottom: 1px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space:nowrap;
        }
        a{
          margin-left: 15px;
          font-weight: normal;
          &:hover{
            text-decoration: underline;
          }
        }
      }
    }

    `}
`;