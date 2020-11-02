import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { DataContext, url, color } from 'common'
import homeIcon from 'resources/home.svg';
import userDefault from 'resources/user_default.jpg';

import SearchBar from '../10_app/30_SearchBar';
import StyledCDiv from 'style/12_topbar/10_Topbar.js';
import Menus from './30_Menus';

export default function Topbar({ home = true, searchBar = true, menus = true }){
  const { pathname } = useLocation();
  const { state: { user }, dispatch } = useContext(DataContext);
  const [showMenus, setShowMenus] = useState(false);
  
  const isHome = pathname === '/';
  const isLogin = pathname === '/login';

  return(
    <StyledCDiv className="top_bar" color={ color }>
      <Link to={ url.HOME } className={ `icon ${ home ? '' : 'hidden' }` }>
        <img src={ homeIcon } alt="Home"/>
      </Link>        
      <SearchBar className={ searchBar ? '' : 'hidden' } />
      
      { user ? 
        <div className={ `me_container ${ menus ? '' : 'hidden' }` }>
          <div className="icon icon--me" onClick={ () => setShowMenus(!showMenus) }>
            <img src={ user.photo_url || userDefault } alt="me"/>
          </div>
          { showMenus && <Menus showMenus={ showMenus } setShowMenus={ setShowMenus } /> }
        </div>
        :
        <Link to={ url.LOGIN } className={ `login_button ${ menus ? '' : 'hidden' }` }>
          <span>로그인</span>
        </Link>
      }
    </StyledCDiv>
  );
}