import React, { useContext, useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { requestApi, api, url, DataContext, actionNames } from '../../common';
import StyledMain from './Login.styled'

export default function Login(){
  const { state: { user }, dispatch } = useContext(DataContext);
  const history = useHistory();
  const loginInput = useRef();
  const [checkedEmail, setCheckedEmail] = useState(null);
  
  function onSubmit(e){
    e.preventDefault();

    dispatch.loadOn();
    if(!checkedEmail){
      const email = loginInput.current.value.trim();
      requestApi({
        path: api.USER_CHECK_EMAIL,
        data: { email },
        success: () => {
          setCheckedEmail(email);
          loginInput.current.value = '';
          loginInput.current.focus();
        },
        fail: msg => {
          if(msg === 'void')alert('유효하지 않은 이메일 입니다');
          loginInput.current.value = '';
          loginInput.current.focus();
        },
        common: dispatch.loadOff
      });
    }else{
      const key = loginInput.current.value.trim();
      requestApi({
        path: api.USER_LOGIN,
        data: { email: checkedEmail, key },
        success: (user) => { dispatch({ type: actionNames.login, user }) },
        fail: msg => {
          if(msg === 'void'){
            alert('먼저 이메일 인증이 필요합니다');
            window.location.reload();
          }else if(msg === 'wrong'){
            alert('잘못된 인증번호 입니다');
          }
        },
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