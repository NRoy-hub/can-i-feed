import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { DataContext, actionNames, color, api, requestApi } from '../../common';
import Post from './Post';
import EnrollForm from './EnrollForm';


export default function Search(){
  const { keyword } = useParams()
  const { state: { posts, species }, dispatch } = useContext(DataContext);
  
  useEffect(() => {
    dispatch({ type: actionNames.setSearchInput, value: keyword });
    dispatch.loadOn();
    requestApi({
      path: `${ api.SEARCH }`,
      data: { keyword, species },
      success: data => dispatch({ type: actionNames.initPost, posts: data.posts }), 
      common: dispatch.loadOff
    });
  }, [keyword, dispatch])

  const { length } = posts;
  return(
    <StyledMain>
      <div className="result">
        <span>{ `${ length > 0 ? length : 'No' } Result${ length > 1 ? 's' : '' }` }</span>
      </div>
      {
        length === 0 && <EnrollForm />
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
  padding-top: 30px;

  .result{
    padding: 11px 40px;
    background: ${ color.grey };
    color: white;
    font-size: 25px;
    font-weight: bold;
  }
`;

