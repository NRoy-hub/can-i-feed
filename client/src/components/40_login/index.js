import React, { useContext, useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { color, requestApi, api, url, DataContext, actionNames } from '../../common';

export default function Login(){
  const { state: { user }, dispatch } = useContext(DataContext);
  const history = useHistory();
  const loginInput = useRef();
  const [checkedEmail, setCheckedEmail] = useState(null);
  
  function onSubmit(e){
    e.preventDefault();

    dispatch.loadOn();
    if(!checkedEmail){
      const email = loginInput.current.value;
      requestApi({
        path: api.USER_CHECK_EMAIL,
        data: { email },
        success: () => {
          setCheckedEmail(email);
          loginInput.current.value = '';
          loginInput.current.focus();
        },
        common: dispatch.loadOff
      });
    }else{
      const key = loginInput.current.value;
      requestApi({
        path: api.USER_LOGIN,
        data: { email: checkedEmail, key },
        success: (user) => { dispatch({ type: actionNames.login, user }) },
        common: dispatch.loadOff
      });
    }
  }

  useEffect(() => {
    loginInput.current.focus();
  }, [])

  useEffect(() => {
    user && history.push(url.HOME);
  }, [user, history])

  return(
    <StyledMain>
      <div className="line"></div>
      <form className="login_form" onSubmit={ onSubmit }>
        <header className="login_form_header">
          <div className="title">CAN I FEED</div>
          <div className="subtitle">로그인</div>
        </header>
        <div className="input_box">
          <label htmlFor="login_input">{ checkedEmail || 'Email' }</label>
          <input ref={ loginInput } id="login_input" type={ checkedEmail ? 'text' : 'email' } required={ true } />
        </div>
        { 
          checkedEmail ? 
            <p className="desc">이메일에 전송된 인증코드를 입력해주세요</p>
            : <p className="desc">이메일 인증코드만 확인하기 때문에 <br />별도의 가입절차가 필요없습니다</p>
        } 
        <input type="submit" value="Login"/>
      </form>
    </StyledMain>
  );
}

const StyledMain = styled.main`
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
`;

