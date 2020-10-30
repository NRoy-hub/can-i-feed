import React from 'react';

import { color } from 'common';
import StyledSection from 'style/30_search/10_Search';
import Topbar from 'components/12_topbar/10_Topbar';
import Post from 'components/30_search/15_Post';

const posts = [...Array(1).keys()].map((_, i) => ({
  id: `temp_post_id_${ i }`,
  photo: 'none',
  name: `블루베리 ${ i }`,
  recommend_count: i,
  nonrecommend_count: 0,
  my_comment: {
    id: `mycomment_${ i }`,
    type: (i%2) + 1,
    text: 'my_comment'
  },
  comments: [ ...Array(30).keys()].map((_, i) => ({
      id: 'test_comment' + i,
      type: 1, 
      text: '맛있어요'
  }))
  
}));

export default function Search(){
  return(
    <StyledSection color={ color }>
      <Topbar />
      <div className="search_container">
        <header className="orders">
          <div className="order selected">
            <span>정확도 순</span>
          </div>
          <div className="order">
            <span>업데이트 순</span>
          </div>
        </header>
        <ul className="posts">
        {
          posts.map(post => <Post key={ post.id } post={ post } />)
        }
        </ul>
      </div>
    </StyledSection>
  );
}