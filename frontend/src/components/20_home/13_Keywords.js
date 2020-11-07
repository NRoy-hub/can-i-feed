import React, { useEffect, useRef, useState, useContext } from 'react';
import timesIcon from 'resources/times.svg';

import StyledSection from 'style/20_home/13_Keywords';
import { color, api, DataContext, requestApi, url, didClickeOutside } from 'common';
import { Link } from 'react-router-dom';
import LoadDots from 'components/10_app/22_LoadDots';

export default function Keywords({ showBoard, setShowBoard }){
  const { dispatch, state: { species } } = useContext(DataContext);
  const [keywords, setKeywords] = useState({});
  const [loading, setLoading] = useState(false);
  const keywordsRef = useRef();
  const TABS = ['most', 'recommend', 'nonrecommend'];
  const [tab, setTab] = useState(TABS[0]);
  const [ranking, setRanking] = useState(0);

  const selectTab = (select) => {
    if(select === tab)return;
    setTab(select);
    ranking !== 0 && setRanking(0);
  }

  useEffect(() => {
    const onClick = e => {
      if(!showBoard)return;
      didClickeOutside(e, keywordsRef.current) && setShowBoard(false);
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick)
  }, [showBoard])

  useEffect(() => {
    const getKeywords = (showLoading = false) => {
      showLoading && setLoading(true);
      requestApi({
        path: api.KEYWORDS,
        data: { species },
        success: data => setKeywords(data),
        common: () => showLoading && setLoading(false)
      });
    };
    getKeywords(true);
    const interval = window.setInterval(getKeywords, 60000);
    return () => window.clearInterval(interval);
  }, []);

  const currentKeywords = keywords[tab] && [...keywords[tab]].splice(ranking * 10, 10);
  return(
    <StyledSection 
      ref={ keywordsRef } 
      className={ `keyword_board ${ showBoard !== null && (showBoard ? 'lift_up' : 'lift_down') }` } 
      color={ color }
      onClick={ () => !showBoard && setShowBoard(true) }
    >
      <div className="close_button" onClick={ () => setShowBoard(false) }>
        <img src={ timesIcon } alt="close button"/>
      </div>
      <ul className="tabs">
        <li className={ `tab ${ tab === TABS[0] ? 'selected' : '' } ` } onClick={ () => selectTab(TABS[0]) }>
          <span>오늘의 검색어</span>
        </li>
        <li className={ `tab ${ tab === TABS[1] ? 'selected' : '' } ` } onClick={ () => selectTab(TABS[1]) }>
          <span>추천 먹이</span>
        </li>
        <li className={ `tab ${ tab === TABS[2] ? 'selected' : '' } ` } onClick={ () => selectTab(TABS[2]) }>
          <span>비추천 먹이</span>
        </li>
      </ul>
      <ul className="rankings">
        <li className={ `ranking ${ ranking === 0 ? 'selected' : '' }` } onClick={ () => setRanking(0)}>
          <span>1 ~ 10위</span>
        </li>
        <li className={ `ranking ${ ranking === 1 ? 'selected' : '' }` } onClick={ () => setRanking(1)}>
          <span>11 ~ 20위</span>
        </li>
      </ul>
      <ul className="keywords">
        { loading && <LoadDots /> }
        {
          currentKeywords && currentKeywords.map((keyword, index) => (
            <li key={ keyword }>
              { index + 1 }<Link to={ url.SEARCH(keyword) } >{ keyword }</Link>
            </li>
          ))
        }
      </ul>
    </StyledSection>
  );
}