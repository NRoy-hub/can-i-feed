import React, { useState } from 'react';

import { color } from 'common';
import StyledSection from 'style/50_mypage/10_MyPage';
import LoadDots from 'components/10_app/22_LoadDots';
import defaultUserImage from 'resources/user_default.jpg';
import cameraIcon from 'resources/camera.svg';

export default function MyPage(){
  const [loading, setLoading] = useState(false);
  return(
    <StyledSection {...{ color }}>
      <div className="mypage_container">
        <header>마이페이지</header>
        <div className="info">
          <div className="profile_photo">
            <img src={ defaultUserImage } alt="profile_photo"/>
            <div className="hover_camera">
              <img src={ cameraIcon } alt="camera_icon"/>
            </div>
          </div>
          <div className="account_setting">
            <label>이메일</label>
            <span className="email">canifeed@gmail.com</span>
            <div className="delete_user">
              <span>삭제</span>
            </div>
          </div>
        </div>
        <div className="my_comments">
          <header>내가 작성한 코멘트</header>
          <ul className="comments_list">
          </ul>
          <nav className="more_button">
            <span>더보기</span>
          </nav>
          <div className="loading">
            { loading && <LoadDots/> }
          </div>
        </div>
      </div>
    </StyledSection>
  );
}