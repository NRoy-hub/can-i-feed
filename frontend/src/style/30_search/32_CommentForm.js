import styled, { css, keyframes } from 'styled-components';

const dropAnimation = keyframes`
  from{
    transform: translateY(-5px);
    opacity: 0;
  }
  to{
    transform: translateY(0);
    opacity: 1;
  }
`;

const buttonHoverAnimation = (backgroundColor) => keyframes`
  from{ background: white; }
  to{ background: ${ backgroundColor }; }
`;

export default styled.form`
  ${ ({ color }) => css`
    position: absolute;
    left: -45px;
    top: 60%;
    box-sizing: border-box;
    width: 160px;
    padding: 5px 10px 8px 10px;
    background: white;
    border: 1px solid ${ color.grey3 };
    border-radius: 5px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
    font-size: 14px;

    animation: ${ dropAnimation } 0.2s ease-in-out;

    .recommend_header{ color: ${ color.green }; }
    .nonrecommend_header{ color: ${ color.red }; }
    input[type=text]{
      box-sizing: border-box;
      width: 100%;
      margin-top: 8px;
      font-size: 14px;
      padding: 3px 2px;
      border: none;
      outline: none;
      border-bottom: 1px solid ${ color.grey4 };
    }
    .comment_form_buttons{
      margin-top: 6px;
      display: flex;
      justify-content: space-between;
      .comment_button{
        padding: 5px 19px;
        &:hover{ 
          cursor: pointer; 
          animation: ${ buttonHoverAnimation(color.light_grey) } .1s ease-in-out;
          background: ${ color.light_grey };
        }
      }
      .comment_cancel{ color: ${ color.grey2 }; }
    }
  `}
`;