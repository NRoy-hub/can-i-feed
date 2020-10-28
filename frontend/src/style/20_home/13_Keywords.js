import styled, { css } from 'styled-components';

const animationTime = 0.3;
const hidePosition = 601;

const liftUpBoard = css`
  @keyframes lift_up_board{
    from{ transform: translateY(${ hidePosition }px); }
    to{ transform: translateY(0); }
  }
  @keyframes show_close_button{
    from{ 
      visibility: visible;
      opacity: 0;
    }
    to{ opacity: 1; }
  }
  animation: lift_up_board ${ animationTime }s ease-in-out;
  transform: translateY(0);
  .close_button{ 
    animation: show_close_button ${ animationTime }s ease-in-out;
    visibility: visible; 
  }
`;

const liftDownBoard = css`
  @keyframes lift_down_board{
    from{ transform: translateY(0); }
    to{ transform: translateY(${ hidePosition }px); }
  }
  @keyframes hide_close_button{
    from{ 
      visibility: visible;
      opacity: 1;
    }
    to{ opacity: 0; }
  }
  animation: lift_down_board ${ animationTime }s ease-in-out;
  transform: translateY(0);
  .close_button{ 
    animation: hide_close_button ${ animationTime }s ease-in-out;
    visibility: hidden; 
  }
  transform: translateY(${ hidePosition }px);
`;


export default styled.article`
  ${ ({ color }) => css`
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
    transform: translateY(${ hidePosition }px);

    .close_button{
      position: absolute;
      top: 12px;
      right: 20px;
      padding: 9px;
      &:hover{ cursor: pointer; }
      visibility: hidden;
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

      &.lift_up{ ${ liftUpBoard } }
      &.lift_down{ ${ liftDownBoard } }
  `}
`;