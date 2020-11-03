import React, { useContext, useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { DataContext, url, requestApi, api, actionNames, getCookiesObject } from 'common';
import Home from 'components/20_home/10_Home';
import Search from 'components/30_search/10_Search';
import Login from 'components/40_login/10_Login';
import DogLoader from './20_DogLoader';
import MyPage from 'components/50_mypage/10_MyPage';
import PhotoNotice from './43_PhotoNotice';


export default function Router(){
  const { state: { loading, user }, dispatch } = useContext(DataContext);
  const [showNotice, setShowNotice] = useState(false);

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

  const noticeStorageKey = 'check_notice_default_photo';
  const onCloseNotice = () => {
    const storage = localStorage[noticeStorageKey] || '';
    localStorage.setItem(noticeStorageKey, `${ storage }${ !!storage ? ',' : '' }${ user.user_id }`);
    setShowNotice(false);
  }

  useEffect(() => {
    if(!user)return;
    if(!user.photo_url){
      const storage = localStorage[noticeStorageKey] && localStorage[noticeStorageKey].split(',');
      if(!storage || !storage.includes(user.user_id))
        setShowNotice(true);
    }
  }, [user])

  return(
    <>
      { loading && <DogLoader /> }
      { showNotice && <PhotoNotice { ...{ onClose: onCloseNotice }} /> }
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