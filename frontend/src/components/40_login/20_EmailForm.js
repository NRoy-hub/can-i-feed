import React, { useRef, useEffect, useContext } from 'react';

import { color, api, DataContext, requestApi } from 'common';
import StyledForm from 'style/40_login/20_EmailForm';

export default function EmailForm({ setCheckedEmail }){
  const { dispatch } = useContext(DataContext);
  const inputRef = useRef();
  const labelRef = useRef();

  const onSubmit = e => {
    e.preventDefault();

    const email = inputRef.current.value.trim();
    if(email.length === 0)return;
    
    dispatch.loadOn();
    requestApi({
      path: api.USER_CHECK_EMAIL,
      data: { email },
      success: () => {
        setCheckedEmail(email);
      },
      fail: msg => {
        if(msg === 'void')alert('유효하지 않은 이메일 입니다');
        inputRef.current.value = '';
        inputRef.current.focus();
      },
      common: dispatch.loadOff
    });
  }

  useEffect(() => {
    const onFocusIn = () => {
      labelRef.current.classList.add('focus_in');
      labelRef.current.classList.remove('focus_out');
    }
    const onFocusOut = () => {
      if(!!inputRef.current.value)return;
      labelRef.current.classList.add('focus_out');
      labelRef.current.classList.remove('focus_in');
    }
    inputRef.current.addEventListener('focusin', onFocusIn);
    inputRef.current.addEventListener('focusout', onFocusOut);
    
    return () => {
      inputRef.current.removeEventListener('focusin', onFocusIn);
      inputRef.current.removeEventListener('focusout', onFocusOut);
    }
  }, []);

  return(
    <StyledForm onSubmit={ onSubmit } color={ color }>
      <div className="input_box">
        <label ref={ labelRef } htmlFor="login_input" className="login_label">Email</label>
        <input type="email" ref={ inputRef } id="login_input" required={ true } />
      </div>
      <p className="desc">
        이메일 인증코드만 확인하기 때문에<br/>
        별도의 회원가입 절차가 없습니다
      </p>
      <button>인증코드 발송</button>
    </StyledForm>
  );
}