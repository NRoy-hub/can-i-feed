import React, { useState, useMemo, useRef, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { color, DataContext, actionNames, api, requestApi } from 'common';
import StyledSection from 'style/30_search/10_Search';
import Topbar from 'components/12_topbar/10_Topbar';
import Post from 'components/30_search/30_Post';
import LoadDots from 'components/10_app/22_LoadDots';

export default function Search(){
  const { state: { posts, species }, dispatch } = useContext(DataContext);
  const { keyword } = useParams()
  const [open, setOpen] = useState(null);
  const [order, setOrder] = useState(0);
  const [showEnroll, setShowEnroll] = useState(false);
  const [loading, setLoading] = useState(false);
  const page = useRef(1);
  const end = useRef(false);
  const postsRef = useRef();

  const requestPosts = (type) => {
    const trimedKeyword = keyword.trim();
    setLoading(true);
    requestApi({
      path: `${ api.SEARCH }`,
      data: { keyword: trimedKeyword, species, page: page.current },
      success: resData => {
        console.log(resData);
        dispatch({ type, posts: resData.posts });
        end.current = resData.posts.length < 10;
        page.current += 1;
        setShowEnroll(!resData.exist);
      }, 
      common: () => setLoading(false)
    });
  }

  useEffect(() => {
    page.current = 1;
    end.current = false;
    requestPosts(actionNames.initPost);
  }, [keyword]);

  useEffect(() => {
    const handleScroll = (e) => {
      if(end.current || loading)return;
      const { scrollY, innerHeight } = window;
      const floor = document.documentElement.offsetHeight - scrollY - innerHeight;
      if(floor === 0){
        requestPosts(actionNames.addPost);
      }
    }
    document.addEventListener('scroll', handleScroll);
    return () => {
      // dispatch({ type: actionNames.initPost, posts: [] })
      document.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const onClickOpen = (index) => setOpen(open === index ? null : index);
  const onChangeOrder = (newOrder) => {
    if(order === newOrder)return;
    setOrder(newOrder);
    setOpen(null);
  }

  const { accuracyOrderPosts, latestUpdateOrderPosts } = useMemo(() => {
    const accuracyOrderPosts = posts.map(post => ({ ...post, key: 'accuracy_' + post.id }));
    let latestUpdateOrderPosts = [...posts].sort((a, b) => moment(b.update_time).valueOf() - moment(a.update_time).valueOf())
    latestUpdateOrderPosts = latestUpdateOrderPosts.map(post => ({ ...post, key: 'update_' + post.id }));

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
          { showEnroll && <div>Enroll Button</div> }
        </header>
        <ul className="posts" ref={ postsRef }>
          {
            orderPosts.map((post, i) => (
              <Post key={ post.key } post={ post } open={ i === open } onClickOpen={ () => onClickOpen(i) } />)
            )
          }
          {
            loading && (
              <div className="loading_container">
                <LoadDots />
              </div>
            )
          }
        </ul>
      </div>
    </StyledSection>
  );
}