import React, { useState } from 'react';

import { color } from 'common';
import StyledArticle from 'style/20_home/10_Home';
import coverImage from 'resources/cover.jpg';
import SearchBar from 'components/10_app/30_SearchBar';
import Topbar from 'components/12_topbar/10_Topbar';
import Keywords from './13_Keywords';


export default function Home(){
  const [showBoard, setShowBoard] = useState(null);

  return(
    <StyledArticle className="home" color={ color }>
      <Topbar { ...{ home: false, searchBar: false } } />
      <figure className="cover">
        <img src={ coverImage } alt="cover image"/>
      </figure>
      <SearchBar />
      <button className="active_button" onClick={ () => setShowBoard(showBoard === null || !showBoard) }>
        <span>인기 먹이 보기</span>
      </button>
      <Keywords showBoard={ showBoard } setShowBoard={ setShowBoard } />
    </StyledArticle>
  );
}
