import React from 'react';

import { color } from 'common';
import StyledArticle from 'style/10_app/43_PhotoNotice';
import PhotoUpload from './40_PhotoUpload';

export default function PhotoNotice({ onClose }){
  return(
    <StyledArticle { ...{ color }}>
      <div className="notice_container">
        <header>프로필 사진 등록</header>
        <PhotoUpload />
        <p className="desc-1">
          위의 이미지를 클릭하여<br/>
          프로필 사진을 변경해주세요.
        </p>
        <div className="desc-2">마이페이지에서 변경 가능</div>
        <div className="close_button" onClick={ onClose }>
          <span>확인</span>
        </div>
      </div>
    </StyledArticle>
  );
}