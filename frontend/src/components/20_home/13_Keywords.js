import React from 'react';
import timesIcon from 'resources/times.svg';

import StyledArticle from 'style/20_home/13_Keywords';
import { color } from 'common';

export default function Keywords({ showBoard, setShowBoard }){
  return(
    <StyledArticle className={ `keyword_board ${ showBoard !== null && (showBoard ? 'lift_up' : 'lift_down') }` } color={ color }>
      <div className="close_button" onClick={ () => setShowBoard(false) }>
        <img src={ timesIcon } alt="close button"/>
      </div>
      <nav className="tabs">
        <div className="tab selected">
          <span>오늘의 검색어</span>
        </div>
        <div className="tab">
          <span>추천 먹이</span>
        </div>
        <div className="tab">
          <span>비추천 먹이</span>
        </div>
      </nav>
      <nav className="rankings">
        <div className="ranking selected">
          <span>1 ~ 10위</span>
        </div>
        <div className="ranking">
          <span>11 ~ 20위</span>
        </div>
      </nav>
      <ul className="keywords">
        {
          [...Array(10).keys()].map((_, i) => (
            <li>
              { i + 1 } <a href="">블루베리</a>
            </li>
          ))
        }
      </ul>
    </StyledArticle>
  );
}