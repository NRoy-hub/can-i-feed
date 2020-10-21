import styled from 'styled-components';
import { color } from '../../common';

export default styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  .line{
    width: 100%;
    height: 2px;
    margin-top: 30px;
    background: ${ color.grey }
  }

  
  .login_form{
    width: 450px;
    height: 390px;
    margin-top: 100px;
    box-shadow: 0 0 1px 2px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .login_form_header{
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 26px;
  }
  .title{
    font-size: 26px;
    font-weight: bold;
    color: ${ color.blue1 };
  }
  .subtitle{
    margin-top: 9px;
    font-size: 26px;
  }

  .input_box{
    position: relative;
    box-sizing: border-box;
    width: 320px;
    height: 50px;
    margin-top: 34px;
    padding: 20px;
    border: 1px solid ${ color.blue2 };
    border-radius: 5px;
    display: flex;
    align-items:center;

    & > label{
      position: absolute;
      top: -19px;
      left: 10px;
      font-size: 14px;
      color: ${ color.blue2 };
    }

    & > input{
      width: 100%;
      border: none;
      outline: none;
      text-align: center;
      font-size: 16px;
    }
  }

  .desc{
    margin-top: 20px;
    line-height: 25px;
    text-align: center;
    color: #777777;
    font-size: 14px;
  }

  input[type=submit]{
    margin-top: 25px;
    width: 200px;
    height: 45px;
    border: none;
    outline: none;
    background: ${ color.blue1 };
    letter-spacing: 2px;
    color: white;
    font-size: 16px;

    &:hover{
      cursor: pointer;
    }
  }

  @media screen and (max-width: 720px){
    .line{ margin-top: 20px; }
    .login_form{
      margin-top: 20px;
      box-shadow: none;
    }
  }

  @media screen and (max-width: 720px){
    .input_box{
      width: 270px;
    }
  }
`;

