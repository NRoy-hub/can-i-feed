import React, { useState, useContext, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { color, DataContext, url, api, requestApi } from 'common';
import StyledDiv from 'style/30_search/20_EnrollPost';
import TimesIcon from 'resources/times.svg';
import UploadIcon from 'resources/file_upload.svg';
import Backdrop from 'resources/file_extentions.jpg';

export default function EnrollPost({ keyword }){
  const { state: { user, species }, dispatch } = useContext(DataContext);
  const history = useHistory();
  const reader = useRef(new FileReader());
  const [openForm, setOpenForm] = useState(false);
  const [preview, setPreview] = useState(null);
  const uploadRef = useRef();

  const onOpenForm = () => {
    if(openForm)return;
    if(!user){
      alert('로그인이 필요합니다.');
      return history.push(url.LOGIN);
    }
    setOpenForm(true);
  };

  const onCloseForm = () => {
    setOpenForm(false);
    setPreview(null);
  };

  const onChangePhoto = () => {
    const file = uploadRef.current.files[0];
    if(file)reader.current.readAsDataURL(file);
    else setPreview(null);
  };

  const onsubmit = e => {
    e.preventDefault();
    const file = uploadRef.current.files[0];
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

  useEffect(() => {
    const onLoad = () => setPreview(reader.current.result);
    reader.current.addEventListener('loadend', onLoad, true);
    return () => reader.current.removeEventListener('loadend', onLoad);
  }, [])

  return(
    <StyledDiv color={ color }>
      <span><span className="keyword">{ keyword }</span> 가 없습니다</span>
      <div className="active_enroll_button" onClick={ onOpenForm }>
        <span>등록하기</span>
      </div>
      { openForm && (
        <div className="enroll_form">
          <img src={ Backdrop } className="backdrop" alt="backdrop"/>
          <div className="close_button" onClick={ onCloseForm }>
            <img src={ TimesIcon } alt="closebutton"/>
          </div>
          <form onSubmit={ onsubmit }>
            <div className="upload_container">
              <input id="photo" type="file" accept="image/*" ref={ uploadRef } onChange={ onChangePhoto } />
              <label htmlFor="photo">
                { preview ?
                  <img src={ preview } alt="photo" className="photo_preview"/>
                  :
                  <img src={ UploadIcon } alt="upload icon"/>
                }
              </label>
            </div>
            <div className="title"><span>{ keyword }</span></div>
            <p className="desc">only image file</p>
            <button className={ `enroll_button ${ preview ? 'active' : '' }` }>
              확인
            </button>
            {/* <div>
              <span>확인</span>
            </div> */}
          </form>
        </div>
      )}
    </StyledDiv>
  )
}