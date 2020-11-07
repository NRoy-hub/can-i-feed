import React, { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { api, requestApi, DataContext, actionNames, url } from 'common';
import StyledLabel from 'style/10_app/40_PhotoUpload';
import defaultUserImage from 'resources/user_default.jpg';
import cameraIcon from 'resources/camera.svg';
import LoadDots from './22_LoadDots';

export default function PhotoUpload(){
  const { state: { user }, dispatch } = useContext(DataContext);
  const history = useHistory();
  const fileRef = useRef();
  const [loading, setLoading] = useState(false);

  const onChangePhoto = () => {
    const file = fileRef.current.files[0];
    const form = new FormData();
    form.append('photo', file);

    setLoading(true);
    requestApi({
      path: api.USER_SET_PHOTO,
      form,
      success: ({ photo_url }) => dispatch({ type: actionNames.setProfilePhoto, photo_url }),
      fail: msg => {
        msg === 'void' && alert('없는 계정입니다.');
        history.push(url.HOME);
      },
      common: () => { 
        setLoading(false);
        fileRef.current.value = '';
      }
    })
  }

  return(
    <StyledLabel htmlFor="photo_upload" className="photo_upload">
      <input type="file" id="photo_upload" ref={ fileRef } onChange={ onChangePhoto } disabled={ loading } />
      <img src={ (user && user.photo_url) || defaultUserImage } alt="profile_photo"/>
      <div className="hover_camera">
        <img src={ cameraIcon } alt="camera_icon"/>
      </div>
      { loading && 
        <div className="loading">
          <LoadDots />
        </div>
      }
    </StyledLabel>
  );
}