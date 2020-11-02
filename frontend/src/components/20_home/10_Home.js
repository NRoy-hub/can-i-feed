import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';

import { url, api, requestApi, DataContext, actionNames, color } from 'common';
import StyledSection from 'style/20_home/10_Home';
import coverImage from 'resources/cover.jpg';
import SearchBar from 'components/10_app/30_SearchBar';
import Topbar from 'components/12_topbar/10_Topbar';
import Keywords from './13_Keywords';


export default function Home(){
  const { dispatch, state: { species } } = useContext(DataContext);
  const [keywords, setKeywords] = useState({});
  const [showBoard, setShowBoard] = useState(null);

  const { latest, most, recommend, nonrecommend } = keywords;

  return(
    <StyledSection color={ color }>
      <Topbar { ...{ home: false, searchBar: false } } />
      <div className="cover">
        <img src={ coverImage } alt="cover image"/>
      </div>
      <SearchBar />
      <div className="active_button" onClick={ () => setShowBoard(showBoard === null || !showBoard) }>
        <span>인기 먹이 보기</span>
      </div>
      <Keywords showBoard={ showBoard } setShowBoard={ setShowBoard } />
    </StyledSection>
  );
}
