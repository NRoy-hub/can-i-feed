import React, { useContext, useRef } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { DataContext, actionNames, url, requestApi, api } from '../../common'
import SearchBar from './SearchBar';
import StyledHeader from './Header.styled';


export default function Header(){
  const history = useHistory();
  const { pathname } = useLocation();
  const { state: { user }, dispatch } = useContext(DataContext);
  const inputRef = useRef();
  
  function getMiddlePath(path){
    return path.split('/')[1];
  }
  
  function onClickSearch(){
    const { value } = inputRef.current;
    if(!!value){
      return history.push(url.SEARCH(value));
    }
    alert('검색어를 입력해주세요');
    inputRef.current.focus();
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
    <StyledHeader>
      <nav>
        <div className="pane left_pane">
          <Link to={ url.HOME } className={ (pathname === url.HOME) ? 'active' : '' }>HOME</Link>
          <div 
            className={ (getMiddlePath(pathname) === getMiddlePath(url.SEARCH())) ? 'active' : '' } 
            onClick={ onClickSearch }                
          >
            SEARCH
          </div>
        </div>
        <div className="pane right_pane">
          { !!user ?
            <div className="email" onClick={ onClickLogout }>
              { user.email }
            </div>
            :
            <Link to={ url.LOGIN } className={ pathname.startsWith(url.LOGIN) ? 'active' : '' }>LOGIN</Link>
          }
        </div>
      </nav>
      <SearchBar inputRef={ inputRef } />
    </StyledHeader>
  )
}

