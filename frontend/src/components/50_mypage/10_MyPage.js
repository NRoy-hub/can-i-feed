import React, { useState } from 'react';

import { color } from 'common';
import StyledSection from 'style/50_mypage/10_MyPage';
import MyComments from './20_MyComments';
import LoadDots from 'components/10_app/22_LoadDots';
import defaultUserImage from 'resources/user_default.jpg';
import cameraIcon from 'resources/camera.svg';
import Topbar from 'components/12_topbar/10_Topbar';

export default function MyPage(){
  const [loading, setLoading] = useState(false);
  const [end, setEnd] = useState(false);
  return(
    <StyledSection {...{ color }}>
      <Topbar { ...{ searchBar: false, menus: false } } />
      <div className="mypage_container">
        <header>마이페이지</header>
        <div className="info">
          <input type="file" id="profile_photo"/>
          <label htmlFor="profile_photo" className="profile_photo">
            <img src={ defaultUserImage } alt="profile_photo"/>
            <div className="hover_camera">
              <img src={ cameraIcon } alt="camera_icon"/>
            </div>
          </label>
          <div className="account_setting">
            <div className="email">
              <label>이메일</label>
              <span>canifeed@gmail.com</span>
            </div>
            <div className="delete_user">
              <span>삭제</span>
            </div>
          </div>
        </div>
        <div className="my_comments">
          <header>내가 작성한 코멘트</header>
          <MyComments />
          {
            !loading && !end && 
            <nav className="more_button">
              <span>더보기</span>
            </nav>
          }
          <div className="loading">
            { loading && <LoadDots/> }
          </div>
        </div>
      </div>
    </StyledSection>
  );
}