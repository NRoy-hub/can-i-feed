import React, { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { api, requestApi, DataContext, actionNames, url } from 'common';
import StyledLabel from 'style/50_mypage/14_PhotoUpload';
import defaultUserImage from 'resources/user_default.jpg';
import cameraIcon from 'resources/camera.svg';

export default function PhotoUpload(){
  const { state: { user }, dispatch } = useContext(DataContext);
  const history = useHistory();
  const fileRef = useRef();

  const onChangePhoto = () => {
    const file = fileRef.current.files[0];
    if(!file){
      // TODO: 프로필 사진 제거 처리
    }

    const form = new FormData();
    form.append('photo', file);

    requestApi({
      path: api.USER_SET_PHOTO,
      form,
      success: ({ photo_url }) => dispatch({ type: actionNames.setProfilePhoto, photo_url }),
      fail: msg => {
        msg === 'void' && alert('없는 계정입니다.');
        history.push(url.HOME);
      },
      common: () => { 
        fileRef.current.value = ''; 
      }
    })
  }

  return(
    <StyledLabel htmlFor="photo_upload" className="photo_upload">
      <input type="file" id="photo_upload" ref={ fileRef } onChange={ onChangePhoto } />
      <img src={ (user && user.photo_url) || defaultUserImage } alt="profile_photo"/>
      <div className="hover_camera">
        <img src={ cameraIcon } alt="camera_icon"/>
      </div>
    </StyledLabel>
  );
}