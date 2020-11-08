import styled, { css, keyframes } from 'styled-components';

const focusOutCSS = color => css`
  left: calc(50% - 1.1em);
  top: 36px;
  font-size: 1em;
  color: ${ color.grey };
`;

const focusInCSS = css`
  top: 0px;
  left: 10px;
  font-size: 0.875em;
  color: inherit;
`;

const focusInLabel = color => keyframes`
  from{ ${ focusOutCSS(color) } }
  to{ ${ focusInCSS } }
`;

const focusOutLabel = color => keyframes`
  from{ ${ focusInCSS } }
  to{ ${ focusOutCSS(color) } }
`;

export default styled.form`
  ${ ({ color }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    .input_box{
      position: relative;
      padding-top: 19px;
      display: flex;
      flex-direction: column;

      .login_label{
        position: absolute;
        left: calc(50% - 1.1em);
        top: 36px;
        font-size: 1em;
        color: ${ color.grey };

        &:hover{ cursor: text; }
        
        &.focus_in{
          ${ focusInCSS }
          animation: ${ focusInLabel(color) } .2s ease-out;
          &:hover{ cursor: default; }
        }
        &.focus_out{
          ${ focusOutCSS(color) }
          animation: ${ focusOutLabel(color) } .2s ease-in-out;
        }
      }
      input[type=text]{
        box-sizing: border-box;
        width: 300px;
        height: 50px;
        padding: 0 5px;
        border: 1px solid #2A2A2A;
        border-radius: 5px;
        text-align: center;
        font-size: 1em;
      }
    }
    .desc{
      margin-top: 15px;
      line-height: 25px;
      font-size: 0.875em;
    }
    button{
      margin-top: 25px;
      padding: 10px 50px;
      background: #2A2A2A;
      border: none;
      border-radius: 5px;
      font-size: 1em;
      color: white;
      &:hover{ cursor: pointer; }
      &.disable{
        background: ${ color.grey2 };
        &:hover{ cursor: default; }
      }
    }
  `} 
`;