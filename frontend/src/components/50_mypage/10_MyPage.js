import React, { useState, useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { api, color, DataContext, requestApi, url } from 'common';
import StyledSection from 'style/50_mypage/10_MyPage';
import MyComment from './20_MyComment';
import PhotoUpload from './14_PhotoUpload';
import LoadDots from 'components/10_app/22_LoadDots';
import Topbar from 'components/12_topbar/10_Topbar';

export default function MyPage(){
  const { state: { user }} = useContext(DataContext);
  const history = useHistory();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [end, setEnd] = useState(false);
  const page = useRef(1);

  useEffect(() => {
    setLoading(true);
    requestApi({
      path: api.USER_MY_COMMENTS,
      data: { page: page.current },
      success: res => {
        setComments(res.comments);
        setEnd(res.end);
      },
      common: () => setLoading(false)
    })
  }, [])

  return(
    <StyledSection {...{ color }}>
      <Topbar { ...{ searchBar: false, menus: false } } />
      <div className="mypage_container">
        <header>마이페이지</header>
        <div className="info">
          <PhotoUpload />
          <div className="account_setting">
            <div className="email">
              <label>이메일</label>
              <span>{ user && user.email }</span>
            </div>
            <div className="delete_user">
              <span>삭제</span>
            </div>
          </div>
        </div>
        <div className="my_comments">
          <header>내가 작성한 코멘트</header>
          <ul className="comments_list">
            { comments.map(comment => <MyComment { ...{ id: comment.id , comment: comment } }/>) }
          </ul>
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