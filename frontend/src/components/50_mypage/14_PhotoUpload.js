import React, { useContext } from 'react';

import { api, requestApi, DataContext, actionNames } from 'common';
import StyledLabel from 'style/50_mypage/14_PhotoUpload';
import defaultUserImage from 'resources/user_default.jpg';
import cameraIcon from 'resources/camera.svg';

export default function PhotoUpload({ photo, setPhoto }){
  const { state: { user }, dispatch } = useContext(DataContext);

  const onChangePhoto = e => {
    const file = e.target.files[0];
    if(!file)return setPhoto(null);

    const form = new FormData();
    form.append('photo', file);

    requestApi({
      path: api.USER_SET_PHOTO,
      form,
      success: ({ photo_url }) => dispatch({ type: actionNames.setProfilePhoto, photo_url }),
      fail: msg => {
        console.error(msg)
      }
    })
  }

  return(
    <StyledLabel htmlFor="photo_upload" className="photo_upload">
      <input type="file" id="photo_upload" onChange={ onChangePhoto } />
      <img src={ (user && user.photo_url) || defaultUserImage } alt="profile_photo"/>
      <div className="hover_camera">
        <img src={ cameraIcon } alt="camera_icon"/>
      </div>
    </StyledLabel>
  );
}