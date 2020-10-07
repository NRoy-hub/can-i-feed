import React, { useContext, useRef } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { DataContext, actionNames, color, url, requestApi, api } from '../../common'
import SearchBar from './SearchBar';


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
      return history.push(`/search/${ value }`);
    }
    alert('검색어를 입력해주세요');
    inputRef.current.focus();
  }

  function onClickLogout(){
    const willLogout = window.confirm('로그아웃 하시겠습니까?');

    dispatch.loadOn();
    willLogout && requestApi({
      method: 'POST',
      path: api.LOGOUT,
      success: () => {
        dispatch({ type: actionNames.logout });
        history.push(url.HOME);
      },
      fail: () => alert('오류가 발생했습니다.'),
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


const StyledHeader = styled.header`
  padding-top: 10px;

  nav{
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    color: white;
  }

  .pane{
    display: flex;
    position: relative;
  }

  .pane > *{
    padding: 14px 20px;
    background: ${ color.grey };
    
    &:hover{
      cursor: pointer;
    }
    &:not(:first-child){
      margin-left: 3px;
    }
    &.active{
      background: ${ color.blue1 };
    }
  }

  .email{
    width: 100%;
    background: white;
    border: 1px solid ${ color.blue1 };
    color: ${ color.blue1 };
  }
`;