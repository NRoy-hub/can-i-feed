import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { url, api, requestApi, color, DataContext, actionNames } from '../../common';


export default function Home(){
  const { dispatch } = useContext(DataContext);
  const [keywords, setKeywords] = useState({});

  useEffect(() => {
    dispatch.loadOn();
    requestApi({
      path: api.KEYWORDS,
      success: ({ keywords }) => {
        dispatch({ type: actionNames.setSearchInput, value: '' })
        setKeywords(keywords);
      },
      common: dispatch.loadOff
    });
  }, [dispatch]);

  const { latest, most, recommend, nonrecommend } = keywords;

  return(
    <StyledMain>
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
        <section>
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
    </StyledMain>
  );
}

const StyledMain = styled.main`
  width: 100%;
  margin-top: 20px;
  font-size: 16px;
  
  .category{
    box-sizing: border-box;
    background: ${ color.grey };
    padding: 12px 40px;
    font-size: 23px;
    color: white;
  }
  
  .table{
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
  }
  
  section{
    width: 33%;
    margin-bottom: 55px;
  }
  
  .head{
    font-size: 20px;
    font-weight: bold;
    text-decoration: underline;
  }

  ul{
    list-style-type: square;
  }
  ol{
    list-style-type: decimal;
  }

  .keywords{
    margin-top: 13px;
    padding-left: 30px;
    color: ${ color.blue1 };

    & > li:not(:first-child){
      margin-top: 10px;
    }
  }

  .desc{
    margin-top: 15px;
    line-height: 30px;
  }
  .notice{
    margin-top: 41px;
    font-weight: bold;
  }
`;