import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import { DataContext, url, requestApi, api, actionNames } from '../../common';
import Header from './Header';
import Home from '../20_home/Home';
import Search from '../30_search/Search';
import Login from '../40_login/Login';
import LoadSpinner from './LoadSpinner';


export default function Container(){
  const { state: { loading }, dispatch } = useContext(DataContext);

  // useEffect(() => {
  //   const cookies = !!document.cookie && 
  //     document.cookie.split('; ').reduce((prev, current) => {
  //       const [name, value] = current.split('=');
  //       prev[name] = value;
  //       return prev
  //     }, {});
      
  //   if(!cookies.canifeed_uid)return;
  //   dispatch.loadOn();
  //   requestApi({
  //     path: api.USER_INFO,
  //     success: user => dispatch({ type: actionNames.login, user }),
  //     common: dispatch.loadOff
  //   })
  // }, []);

  return(
    <>
      <Header />
      { loading && <LoadSpinner /> }
      {/* <Switch>
        <Route exact path={ url.HOME } component={ Home } />
        <Route path={ url.SEARCH() } component={ Search } />
        <Route path={ url.LOGIN } component={ Login } />
        <Route path="*"><Redirect to="/" /></Route>
      </Switch> */}
    </>
  )
}

const StyledDiv = styled.div`
  /* box-sizing: border-box;
  min-width: 320px;
  width: 1190px;

  @media screen and (max-width: 1090px){
    width: 100vw;
    padding: 0 10px;
  }
  @media screen and (max-width: 720px){
    padding: 0 10px;
  } */
`;