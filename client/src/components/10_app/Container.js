import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import { DataContext, url, requestApi, api, actionNames } from '../../common';
import Header from './Header';
import Home from '../20_home';
import Search from '../30_search';
import Login from '../40_login';
import LoadSpinner from './LoadSpinner';


export default function Container(){
  const { state: { loading, user }, dispatch } = useContext(DataContext);

  useEffect(() => {
    const cookies = !!document.cookie && 
      document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');
        prev[name] = value;
        return prev
      }, {});
      
    if(!cookies.canifeed_uid)return;
    dispatch.loadOn();
    requestApi({
      path: api.USER_INFO,
      success: user => dispatch({ type: actionNames.login, user }),
      common: dispatch.loadOff
    })
  }, []);

  return(
    <StyledDiv>
      <Header />
      { loading && <LoadSpinner /> }
      <Switch>
        <Route exact path={ url.HOME } component={ Home } />
        <Route path={ url.SEARCH() } component={ Search } />
        <Route path={ url.LOGIN } component={ Login } />
        <Route path="*"><Redirect to="/" /></Route>
      </Switch>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  width: 1190px;
`;