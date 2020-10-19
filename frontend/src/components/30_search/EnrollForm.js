import React, { useState, useRef, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import FormData from 'form-data';

import { api, url, requestApi, DataContext } from '../../common';
import StyledAside from './EnrollForm.styled';

export default function EnrollForm(){
  const history = useHistory();
  const { keyword } = useParams();
  const photoInput = useRef();
  const label = useRef();
  const { dispatch, state: { species, user } } = useContext(DataContext);
  const [showForm, setShowForm] = useState(false);
  const [showLabelMsg, setShowLabelMsg] = useState(true);
  const reader = useRef(new FileReader());

  function onSubmit(e){
    e.preventDefault();
    const file = photoInput.current.files[0];
    if(!file){ return alert('이미지를 업로드해주세요'); }

    dispatch.loadOn();
    const form = new FormData();
    form.append('photo', file);
    form.append('name', keyword);
    form.append('species', species);
    
    requestApi({
      path: api.POST_ENROLL,
      form,
      success: () => { 
        alert(`'${ keyword }' 먹이를 등록하였습니다.`);
        window.location.reload();
      },
      fail: msg => { 
        if(msg === 'conflict'){
          alert('동일한 이름의 포스트가 존재합니다');
          window.location.reload();
        }
      },
      common: dispatch.loadOff
    }) 
  }

  function onClick(){
    if(!user)return history.push(url.LOGIN);
    setShowForm(!showForm);
  }
  
  function onChange(){
    const file = photoInput.current.files[0];
    if(file){ reader.current.readAsDataURL(file); }
    else{
      label.current.style.backgroundImage = '';
      setShowLabelMsg(true);
    }
  }
  
  useEffect(() => {
    const onLoad = () => {
      label.current.style.backgroundImage = `url(${ reader.current.result })`;
      setShowLabelMsg(false);
    };
    reader.current.addEventListener('loadend', onLoad, true);
    return () => reader.current.removeEventListener('loadend', onLoad);
  }, [reader]);

  return(
    <StyledAside>
      <div className="enroll_button">
        <span onClick={ onClick }>{ showForm ? '등록 취소하기' : `'${ keyword }' 등록하기` }</span>
      </div>
      {
        showForm &&
          <form action="" className="enroll_form" onSubmit={ onSubmit }>
            <div className="photo_box">
              <input ref={ photoInput } id="photo" type="file" accept="image/*" onChange={ onChange } />
              <label ref={ label } htmlFor="photo">
                { showLabelMsg && <span>IMAGE</span> }
              </label>
            </div>
            <div className="info">
              <div className="title">{ keyword }</div>
              <div className="status">
                <div>좋아요 0</div>
                <div>싫어요 0</div>
              </div>
              <p className="desc">!! 적합한 이미지를 업로드 해주세요. (업로드 필수)</p>
              <p className="desc">!! 부적합한 이미지라고 판단될 시 운영측에서 이미지를 변경할 수 있습니다.</p>
              <input type="submit" value="등록하기"/>
            </div>
          </form>
      }
    </StyledAside>
  );
}

