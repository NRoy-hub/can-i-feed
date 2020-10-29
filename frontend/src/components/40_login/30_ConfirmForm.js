import React, { useState, useRef, useContext } from 'react';

import { color, api, DataContext, actionNames, requestApi } from 'common';
import StyledForm from 'style/40_login/30_ConfirmForm';

export default function ConfirmForm({ checkedEmail, setCheckedEmail }){
  const { dispatch } = useContext(DataContext);
  const [keepLogin, setKeepLogin] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const inputRef = useRef();

  const onSubmit = e => {
    e.preventDefault();

    const key = inputRef.current.value.trim();
    if(key.length === 0)return;

    dispatch.loadOn();
    requestApi({
      path: api.USER_LOGIN,
      data: { email: checkedEmail, key, keep: keepLogin },
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

  const onChange = e => {
    const { value } = e.target;
    const standard = 5;
    if(canSubmit && value.length < standard)
      setCanSubmit(false);
    else if(!canSubmit && value.length >= standard)
      setCanSubmit(true);
  }

  return(
    <StyledForm color={ color } onSubmit={ onSubmit }>
      <div className="input_box">
        <label htmlFor="confirm_input">{ checkedEmail }</label>
        <input type="text" id="confirm_input" ref={ inputRef } required={ true } onChange={ onChange } />
      </div>
      <div className="desc">
        이메일에 전송된 인증코드를 입력해주세요
      </div>
      <div className={ `login_keep ${ keepLogin ? 'checked' : '' }` }>
        <input type="checkbox" id="keep_checkbox" onClick={ () => setKeepLogin(!keepLogin) } />
        <label htmlFor="keep_checkbox">로그인 상태 유지</label>
      </div>
      <button className={ canSubmit? '' : 'disable' } disabled={ !canSubmit }>확인</button>
      <div className="cancel_button" onClick={ () => setCheckedEmail(null) }>
        <span>다른 이메일로 로그인</span>
      </div>
    </StyledForm>
  );
}