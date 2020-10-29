import React, { useContext, useRef } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { DataContext, actionNames, url, requestApi, api, color } from 'common'
import homeIcon from 'resources/home.svg';
import userDefault from 'resources/user_default.jpg';

import SearchBar from '../10_app/30_SearchBar';
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
  const isHome = pathname === '/';
  const isLogin = pathname === '/login';
  return(
    <StyledCDiv className="top_bar" color={ color }>
      <Link to={ url.HOME } className={ `icon ${ isHome && 'hidden' }` }>
        <img src={ homeIcon } alt="Home"/>
      </Link>        
      <SearchBar className={ (isHome || isLogin) && 'hidden' } />
      <div className="me_container">
        <div className="icon icon--me">
          <img src={ userDefault } alt="me"/>
        </div>
        <Menus />
      </div>
      <Link to={ url.LOGIN } className={ `login_button ${ isLogin && 'hidden' }` }>
        <span>로그인</span>
      </Link>
    </StyledCDiv>
  );
}