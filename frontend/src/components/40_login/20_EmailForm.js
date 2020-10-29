import React, { useRef, useEffect, useContext, useState } from 'react';

import { color, api, DataContext, requestApi } from 'common';
import StyledForm from 'style/40_login/20_EmailForm';

export default function EmailForm({ setCheckedEmail }){
  const { dispatch } = useContext(DataContext);
  const [canSubmit, setCanSubmit] = useState(false);
  const inputRef = useRef();
  const labelRef = useRef();

  const checkEmailRegex = (str) => {
    const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    return reg_email.test(str);
  }

  const onSubmit = e => {
    e.preventDefault();
    const email = inputRef.current.value.trim();
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

  const onChange = e => {
    const correctEmail = checkEmailRegex(e.target.value);
    if(!canSubmit && correctEmail)
      setCanSubmit(true);
    else if(canSubmit && !correctEmail)
      setCanSubmit(false);
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
        <input type="text" ref={ inputRef } id="login_input" required={ true } onChange={ onChange } />
      </div>
      <p className="desc">
        이메일 인증코드만 확인하기 때문에<br/>
        별도의 회원가입 절차가 없습니다
      </p>
      <button className={ canSubmit ? '' : 'disable' } disabled={ !canSubmit }>인증코드 발송</button>
    </StyledForm>
  );
}