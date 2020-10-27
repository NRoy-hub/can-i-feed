import React, { useContext, useRef } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { DataContext, actionNames, url, requestApi, api, color } from 'common'
import homeIcon from 'resources/home.svg';
import userDefault from 'resources/user_default.jpg';
import coverImage from 'resources/cover.jpg';

import SearchBar from './20_SearchBar';
import StyledCDiv from 'style/12_topbar/10_Topbar.js';
import Menus from './30_Menus';

export default function Header(){
  const history = useHistory();
  const { pathname } = useLocation();
  const { state: { user }, dispatch } = useContext(DataContext);
  
  function getMiddlePath(path){
    return path.split('/')[1];
  }

  function onClickLogout(){
    const willLogout = window.confirm('로그아웃 하시겠습니까?');
    if(!willLogout)return;

    dispatch.loadOn();
    requestApi({
      path: api.USER_LOGOUT,
      success: () => {
        dispatch({ type: actionNames.logout });
        alert('로그아웃 되었습니다');
        history.push(url.HOME);
      },
      common: dispatch.loadOff
    })
  }

  return(
    <StyledCDiv color={ color }>
      <Link to={ url.HOME } className="icon icon--home">
        <img src={ homeIcon } alt="Home"/>
      </Link>
      <div className="middle_container">
        <div className="cover_image">
          <img src={ coverImage } alt="cover image"/>
        </div>
        <SearchBar />
      </div>
      <div className="me_container">
        <div className="icon icon--me">
          <img src={ userDefault } alt="me"/>
        </div>
        <Menus />
      </div>
      <Link to={ url.LOGIN } className="login_button">
        <span>로그인</span>
      </Link>
    </StyledCDiv>
  );
}