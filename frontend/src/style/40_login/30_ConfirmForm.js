import styled, { css } from 'styled-components';

export default styled.form`
  ${ ({ color }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;

    .input_box{
      position: relative;
      box-sizing: border-box;
      width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 0.875em;
      color: ${ color.blue };

      label{
        padding: 0 10px;
      }

      input[type=text]{
        box-sizing: border-box;
        width: 300px;
        height: 50px;
        margin-top: 2px;
        padding: 0 5px;
        border: 1px solid ${ color.blue };
        border-radius: 5px;
        text-align: center;
        font-size: 1em;
        letter-spacing: 2px;
      }
    }
    .desc{
      margin-top: 15px;
      font-size: 0.875em;
    }
    .login_keep{
      margin-top: 12px;
      color: ${ color.grey2 };
      label{
        padding-left: 7px;
        font-size: 0.875em;
        &:hover{ cursor: pointer; }
      }
      &.checked{ color: inherit; }
    }
    button{
      margin-top: 19px;
      padding: 10px 84px;
      border: none;
      border-radius: 5px;
      outline-color: ${ color.blue };
      background: ${ color.deep_blue };
      color: white;
      font-size: 1em;

      &:hover{ cursor: pointer; }
      &.disable{
        background: #9EB1C9;
        cursor: default;
      }
    }
    .cancel_button{
      margin-top: 10px;
      padding: 6px 10px;
      font-size: 0.875em;
      color: ${ color.grey };

      &:hover{ cursor: pointer; }
    }
  `}
`;