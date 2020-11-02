import React, { useContext, useRef, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

import profileEditIcon from 'resources/profile_edit.png';
import commentsIcon from 'resources/comments.png';
import logoutIcon from 'resources/logout.png';

import { color, DataContext, requestApi, api, url, actionNames, didClickeOutside } from 'common';
import StyledUl from 'style/12_topbar/30_Menus';

export default function Menus({ showMenus, setShowMenus }){
  const { dispatch } = useContext(DataContext);
  const history = useHistory();
  const menusRef = useRef();

  function onClickLogout(){
    const willLogout = window.confirm('로그아웃 하시겠습니까?');
    if(!willLogout)return;

    dispatch.loadOn();
    requestApi({
      path: api.USER_LOGOUT,
      success: () => {
        dispatch({ type: actionNames.logout });
        history.push(url.HOME);
      },
      common: dispatch.loadOff
    })
  }

  useEffect(() => {
    const onClick = e => {
      if(!showMenus)return;
      didClickeOutside(e, menusRef.current) && setShowMenus(false);
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick)
  }, [showMenus])


  return(
    <StyledUl ref={ menusRef } color={ color }>
      <li>
        <Link className="menu" to={ url.MYPAGE }>
          <img src={ profileEditIcon } alt="profile edit icon"/>
          <span>마이페이지</span>
        </Link>
      </li>
      <li className="menu" onClick={ onClickLogout }>
        <img src={ logoutIcon } alt="logout icon"/>
        <span>로그아웃</span>
      </li>
    </StyledUl>
  );
};