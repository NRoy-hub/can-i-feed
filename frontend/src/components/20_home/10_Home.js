import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';

import { url, api, requestApi, DataContext, actionNames, color } from 'common';
import StyledSection from 'style/20_home/10_Home';
import timesIcon from 'resources/times.svg';
import coverImage from 'resources/cover.jpg';
import SearchBar from 'components/10_app/30_SearchBar';
import Topbar from 'components/12_topbar/10_Topbar';


export default function Home(){
  const { dispatch, state: { species } } = useContext(DataContext);
  const [keywords, setKeywords] = useState({});
  const [showBoard, setShowBoard] = useState(false);

  // useEffect(() => {
  //   dispatch.loadOn();
  //   requestApi({
  //     path: api.KEYWORDS,
  //     data: { species },
  //     success: data => {
  //       dispatch({ type: actionNames.setSearchInput, value: '' })
  //       setKeywords(data);
  //     },
  //     common: dispatch.loadOff
  //   });
  // }, [dispatch]);

  const { latest, most, recommend, nonrecommend } = keywords;

  const pre = (
    <StyledSection>
      <div className="category">Search History</div>
      <div className="table">
        <section>
          <div className="head">최근 검색 키워드</div>
          <ul className="keywords">{
            latest && latest.map(keyword => (
              <li key={ `latest-${ keyword }` }><Link to={ url.SEARCH(keyword) } ><span>{ keyword }</span></Link></li>
            ))
          }</ul>
        </section>
        <section>
          <div className="head">최다 검색 키워드</div>
          <ol className="keywords">{
            most && most.map(keyword => (
              <li key={ `most-${ keyword }` }><Link to={ url.SEARCH(keyword) } ><span>{ keyword }</span></Link></li>
            ))
          }</ol>
        </section>
        <section className="precautions">
          <div className="head">이용시 주의사항</div>
          <div className="desc">애완동물에게 '이것'을 (먹여)주어도 되는지에 대한 정보를 교류하는 사이트입니다. 동물을 사랑하는 마음을 가지고 이용하시길 바랍니다</div>
          <p className="notice">!! 현재 강아지에 대한 정보만 이용 가능합니다.</p>
        </section>
        <section>
          <div className="head">추천 먹이 순위</div>
          <ol className="keywords">{
            recommend && recommend.map(keyword => (
              <li key={ `recommend-${ keyword }` }><Link to={ url.SEARCH(keyword) } ><span>{ keyword }</span></Link></li>
            ))
          }</ol>
        </section>
        <section>
          <div className="head">비추천 먹이 순위</div>
          <ol className="keywords">{
            nonrecommend && nonrecommend.map(keyword => (
              <li key={ `nonrecommend-${ keyword }` }><Link to={ url.SEARCH(keyword) }><span>{ keyword }</span></Link></li>
            ))
          }</ol>
        </section>
      </div>
    </StyledSection>
  )

  return(
    <StyledSection color={ color } showBoard={ showBoard }>
      <Topbar />
      <div className="cover">
        <img src={ coverImage } alt="cover image"/>
      </div>
      <SearchBar />
      <div className="active_button" onClick={ () => setShowBoard(!showBoard) }>
        <span>인기 먹이 보기</span>
      </div>
      <article className="keyword_board">
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
      </article>
    </StyledSection>
  );
}
