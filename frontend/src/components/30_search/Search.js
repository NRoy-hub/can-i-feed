import React, { useEffect, useContext, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { DataContext, actionNames, color, api, requestApi } from '../../common';
import Post from './Post';
import EnrollForm from './EnrollForm';


export default function Search(){
  const { keyword } = useParams()
  const { state: { posts, species }, dispatch } = useContext(DataContext);
  const [showEnroll, setShowEnroll] = useState(false);
  const wrapper = useRef();
  const page = useRef(1);
  const end = useRef(false);

  const requestPosts = () => {
    const trimedKeyword = keyword.trim();
    dispatch({ type: actionNames.setSearchInput, value: trimedKeyword });
    dispatch.loadOn();
    requestApi({
      path: `${ api.SEARCH }`,
      data: { keyword: trimedKeyword, species, page: page.current },
      success: resData => {
        dispatch({ type: actionNames.addPost, posts: resData.posts });
        end.current = resData.posts.length < 10;
        page.current += 1;
        setShowEnroll(!resData.exist);
      }, 
      common: dispatch.loadOff
    });
  }

  useEffect(() => {
    requestPosts();
    const handleScroll = (e) => {
      if(end.current)return;
      const { scrollY, innerHeight } = window;
      const floor = document.documentElement.offsetHeight - scrollY - innerHeight;
      if(floor === 0){
        requestPosts();
      }
    }
    document.addEventListener('scroll', handleScroll);
    return () => {
      dispatch({ type: actionNames.initPost, posts: [] })
      document.removeEventListener('scroll', handleScroll);
    }
  }, [])

  const { length } = posts;
  return(
    <StyledMain ref={ wrapper }>
      <div className="result">
        <span>{ `${ length > 0 ? length : 'No' } Result${ length > 1 ? 's' : '' }` }</span>
      </div>
      {
        showEnroll && <EnrollForm />
      }
      <ul className="posts">
        {
          posts.map((post, i) => <Post key={ post.id } data={ post } index={ i } />)
        }
      </ul>
    </StyledMain>
  );
}

const StyledMain = styled.main`
  padding-top: 20px;

  .result{
    box-sizing: border-box;
    padding: 12px 40px;
    background: ${ color.grey };
    color: white;
    font-size: 23px;
  }
  .posts{
    padding-bottom: 20px;
  }

  @media screen and (max-width: 1090px){
    .result{
      padding-left: 30px;
    }
  }

  @media screen and (max-width: 720px){
    padding-top: 15px;
    .result{
      height: 41px;
      padding-left: 20px;
      font-size: 16px;
    }
  }
`;

