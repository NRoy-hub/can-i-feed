import React, { useContext, useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { requestApi, api, url, DataContext, actionNames, color } from 'common';
import Topbar from 'components/12_topbar/10_Topbar';
import StyledArticle from 'style/40_login/10_Login';
import puppyImage from 'resources/puppy.png';
import EmailForm from 'components/40_login/20_EmailForm';
import ConfirmForm from './30_ConfirmForm';

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
    user && history.push(url.HOME);
  }, [user, history])

  return(
    <StyledArticle color={ color }>
      <Topbar { ...{ searchBar: false, menus: false } } />
      <div className="login_container">
        <div className="login_frame">
          <figure className="logo">
            <figcaption>Can I feed my puppy?</figcaption>
            <img src={ puppyImage } alt="puppy"/>
          </figure>
          <h1 className="login_header">
            로그인
          </h1>
          {
            checkedEmail ? 
              <ConfirmForm checkedEmail={ checkedEmail } setCheckedEmail={ setCheckedEmail } />
              :
              <EmailForm setCheckedEmail={ setCheckedEmail } />
          }

        </div>
      </div>
    </StyledArticle>
  );
}