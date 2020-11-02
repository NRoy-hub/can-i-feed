import React from 'react';

import StyledLabel from 'style/50_mypage/14_PhotoUpload';
import defaultUserImage from 'resources/user_default.jpg';
import cameraIcon from 'resources/camera.svg';

export default function PhotoUpload({ photo, setPhoto }){

  const onChangePhoto = e => {
    const file = e.target.files[0];
    if(!file)return setPhoto(null);

    const form = new FormData();
    form.append('photo', file);

    // requestAPI
  }

  return(
    <StyledLabel htmlFor="photo_upload" className="photo_upload">
      <input type="file" id="photo_upload" onChange={ onChangePhoto } />
      <img src={ photo || defaultUserImage } alt="profile_photo"/>
      <div className="hover_camera">
        <img src={ cameraIcon } alt="camera_icon"/>
      </div>
    </StyledLabel>
  );
}