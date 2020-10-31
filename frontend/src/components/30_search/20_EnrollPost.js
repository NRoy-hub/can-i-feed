import React from 'react';

import { color } from 'common';
import StyledDiv from 'style/30_search/20_EnrollPost';
import TimesIcon from 'resources/times.svg';
import UploadIcon from 'resources/file_upload.svg';
import Backdrop from 'resources/file_extentions.jpg';

export default function EnrollPost({ keyword }){
  return(
    <StyledDiv color={ color }>
      <span><span className="keyword">{ keyword }</span> 가 없습니다</span>
      <div className="active_enroll_button">
        <span>등록하기</span>
      </div>
      <div className="enroll_form">
        <img src={ Backdrop } className="backdrop" alt="backdrop"/>
        <div className="close_button">
          <img src={ TimesIcon } alt="closebutton"/>
        </div>
        <form>
          <div className="upload_container">
            <input id="photo" type="file" accept="image/*"/>
            <label htmlFor="photo">
              <img src={ UploadIcon } alt="upload icon"/>
              {/* <img src="" alt="photo"/> */}
            </label>
          </div>
          <div className="title"><span>{ keyword }</span></div>
          <p className="desc">only image file</p>
          <div className="enroll_button">
            <span>등록하기</span>
          </div>
        </form>
      </div>
    </StyledDiv>
  )
}