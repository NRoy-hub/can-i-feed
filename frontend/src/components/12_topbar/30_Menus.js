import React, { useContext, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import profileEditIcon from 'resources/profile_edit.png';
import commentsIcon from 'resources/comments.png';
import logoutIcon from 'resources/logout.png';

import { color, DataContext, requestApi, api, url, actionNames } from 'common';
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
        alert('로그아웃 되었습니다');
        history.push(url.HOME);
      },
      common: dispatch.loadOff
    })
  }

  useEffect(() => {
    const onClick = e => {
      if(!showMenus)return;
      const { left, right, top, bottom } = menusRef.current.getBoundingClientRect();
      const { clientX: x, clientY: y } = e;   
      if(x < left || right < x || y < top || bottom < y)
        setShowMenus(false);
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick)
  }, [showMenus])


  return(
    <StyledUl ref={ menusRef } color={ color }>
      <li>
        <img src={ profileEditIcon } alt="edit icon"/>
        <span>Edit</span>
      </li>
      <li>
        <img src={ commentsIcon } alt="comments icon"/>
        <span>Comments</span>
      </li>
      <li onClick={ onClickLogout }>
        <img src={ logoutIcon } alt="logout icon"/>
        <span>Logout</span>
      </li>
    </StyledUl>
  );
};