import React, { useState, useMemo, useRef, useEffect } from 'react';
import moment from 'moment';

import { color } from 'common';
import StyledSection from 'style/30_search/10_Search';
import Topbar from 'components/12_topbar/10_Topbar';
import Post from 'components/30_search/15_Post';

const posts = [...Array(3).keys()].map((_, i) => ({
  id: `temp_post_id_${ i }`,
  photo: 'none',
  name: `블루베리 ${ i }`,
  recommend_count: 30,
  nonrecommend_count: 1,
  my_comment: {
    id: `mycomment_${ i }`,
    type: (i%2) + 1,
    text: 'my_comment'
  },
  comments: [ ...Array(30).keys()].map((_, i) => ({
      id: 'test_comment' + i,
      type: 1, 
      text: '맛있어요'
  })),
  update_time: `2020-10-29T14:1${ i }:40+09:00`
}));



export default function Search(){
  const [open, setOpen] = useState(null);
  const [order, setOrder] = useState(0);
  const postsRef = useRef();

  const onClickOpen = (index) => setOpen(open === index ? null : index);
  const onChangeOrder = (newOrder) => {
    if(order === newOrder)return;
    setOrder(newOrder);
    setOpen(null);
  }

  const { accuracyOrderPosts, latestUpdateOrderPosts } = useMemo(() => {
    const accuracyOrderPosts = posts.map(post => ({ ...post, key: 'accuracy_' + post.id }));
    let latestUpdateOrderPosts = [...posts].sort((a, b) => moment(b.update_time).valueOf() - moment(a.update_time).valueOf())
    latestUpdateOrderPosts.map(post => ({ ...post, key: 'update_' + post.id }));

    return { accuracyOrderPosts, latestUpdateOrderPosts };
  }, posts)

  const orderPosts = useMemo(() => order === 0 ? accuracyOrderPosts : latestUpdateOrderPosts, [posts, order]);

  return(
    <StyledSection color={ color }>
      <Topbar />
      <div className="search_container">
        <header className="orders">
          <div className={ `order ${ order === 0 ? 'selected' : '' }` } onClick={ () => onChangeOrder(0) }>
            <span>정확도 순</span>
          </div>
          <div className={ `order ${ order === 1 ? 'selected' : '' }` } onClick={ () => onChangeOrder(1) }>
            <span>업데이트 순</span>
          </div>
        </header>
        <ul className="posts" ref={ postsRef }>
        {
          orderPosts.map((post, i) => (
            <Post key={ post.key } post={ post } open={ i === open } onClickOpen={ () => onClickOpen(i) } />)
          )
        }
        </ul>
      </div>
    </StyledSection>
  );
}