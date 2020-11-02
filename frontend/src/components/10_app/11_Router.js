import React, { useContext, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { DataContext, url, requestApi, api, actionNames, getCookiesObject } from 'common';
import Home from 'components/20_home/10_Home';
import Search from 'components/30_search/10_Search';
import Login from 'components/40_login/10_Login';
import LoadSpinner from './20_LoadSpinner';
import MyPage from 'components/50_mypage/10_MyPage';


export default function Container(){
  const { state: { loading }, dispatch } = useContext(DataContext);

  useEffect(() => {
    const cookies = getCookiesObject();
    if(!cookies.canifeed_uid)return;
    dispatch.loadOn();
    requestApi({
      path: api.USER_INFO,
      success: user => dispatch({ type: actionNames.login, user }),
      common: dispatch.loadOff
    })
  }, []);

  return(
    <>
      { loading && <LoadSpinner /> }
      <Switch>
        <Route exact path={ url.HOME } component={ Home } />
        <Route path={ url.SEARCH() } component={ Search } />
        <Route path={ url.LOGIN } component={ Login } />
        <Route path={ url.MYPAGE } component={ MyPage } />
        <Route path="*"><Redirect to="/" /></Route>
      </Switch>
    </>
  )
}