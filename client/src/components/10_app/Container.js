import React, { useContext } from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import { DataContext, url } from '../../common';
import Header from './Header';
import Home from '../20_home';
import Search from '../30_search';
import Login from '../40_login';
import LoadSpinner from './LoadSpinner';


export default function Container(){
  const { state: { loading } } = useContext(DataContext);

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