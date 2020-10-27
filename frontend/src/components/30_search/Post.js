import React, { useContext, useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { url, api, requestApi, DataContext, actionNames } from 'common';
import StyledLi from 'style/30_search/Post';
import recommendIcon from 'resources/recommend.png';
import nonrecommendIcon from 'resources/nonrecommend.png';

const RECOMMEND = 1;
const NONRECOMMEND = 2;
const CANCEL = 0;

export default function Post({ data, index }){
  const { id, photo, name, my_comment, recommend_count, nonrecommend_count, comments } = data;
  const history = useHistory();
  const { state: { user, posts }, dispatch } = useContext(DataContext);
  const [speakType, setSpeakType] = useState(null);
  const commentInput = useRef();

  const handleSpeakOut = () => {
    if(!speakType)return;
    dispatch.loadOn();
    requestApi({
      path: api.POST_SPEAK_OUT,
      data: { post_id: id, type: speakType, text: commentInput.current.value },
      success: resData => {
        const newPost = { ...posts[index], ...resData }
        dispatch({ type: actionNames.modifyPost, index, post: newPost })
      },
      fail: msg => {
        if(msg === 'void')
          alert('포스트가 존재하지 않습니다');
        else if(msg === 'conflict')
          alert('이미 의견을 내었습니다');
      },
      common: () => {
        setSpeakType(null);
        dispatch.loadOff();
      }
    });
  }

  const handleCommentKeyDown = e => {
    console.log(e.key);
    if(e.key === 'Enter')handleSpeakOut();
    else if(e.key === 'Escape')setSpeakType(null);
  }
  
  const onClick = type => {
    if(!user){ return history.push(url.LOGIN); }
    if(my_comment && my_comment.type !== type){ return; }

    let newType = my_comment ? CANCEL : type;
    
    if(newType === CANCEL){
      dispatch.loadOn();
      requestApi({
        path: api.POST_RECANT,
        data: { post_id: id },
        success: (resData) => dispatch({ 
          type: actionNames.modifyPost, 
          index, 
          post: { ...posts[index], my_comment: null, ...resData } }),
        fail: msg => {
          if(msg === 'void')
            alert('포스트가 존재하지 않습니다');
          else if(msg === 'conflict')
            alert('이미 나의 의견이 존재하지 않습니다');
        },
        common: dispatch.loadOff
      });
    }else{
      setSpeakType(type);
    }
  };

  useEffect(() => {
    if(speakType){
      commentInput.current.focus();
    }
  }, [speakType])
    
  const commentList = my_comment && !!my_comment.text ? [my_comment].concat(comments) : comments;

  return(
    <StyledLi>
      <div className="photo">
        <img src={ photo } alt="post_photo"/>
      </div>
      <div className="info">
        <div className="info_top">
          <div className="title">{ name }</div>
          <div className="status">
            <div 
              className={ `state recommend ${ my_comment && my_comment.type === RECOMMEND ? 'active' : '' }` }
              onClick={ () => onClick(RECOMMEND) }>
                좋아요 { recommend_count }
            </div>
            <div 
              className={ `state nonrecommend ${ my_comment && my_comment.type === NONRECOMMEND ? 'active' : '' }` }
              onClick={ () => onClick(NONRECOMMEND)}>
                나빠요 { nonrecommend_count }
            </div>
            <div 
              className={ `state_icon recommend_icon ${ my_comment && my_comment.type === RECOMMEND ? 'active' : '' }`}
              onClick={ () => onClick(RECOMMEND) }>
                <span className="icon_number">{ recommend_count }</span>
                <div className="icon_box">
                  <img src={ recommendIcon } alt="추천"/>
                </div>
            </div>
            <div 
              className={ `state_icon nonrecommend_icon ${ my_comment && my_comment.type === NONRECOMMEND ? 'active' : '' }` }
              onClick={ () => onClick(NONRECOMMEND)}>
                <span className="icon_number">{ nonrecommend_count }</span>
                <div className="icon_box">
                  <img src={ nonrecommendIcon } alt="비추천"/>
                </div>
            </div>
            { speakType && 
              <div className={ `comment_input ${ speakType === RECOMMEND ? 'good' : 'bad' }` }>
                <div className="comment_title">comment ({ speakType === RECOMMEND ? 'Good' : 'Bad' })</div>
                <input type="text" ref={ commentInput } onKeyDown={ handleCommentKeyDown } placeholder="10자 이내 작성가능" maxLength={ 10 } />
                <div className="comment_buttons">
                  <span className="comment_ok" onClick={ handleSpeakOut }>ok</span>
                  <span className="comment_skip" onClick={ () => setSpeakType(null) }>skip</span>
                </div>
              </div>
            }
          </div>
        </div>
        <ul className="comments">
          {
            commentList && commentList.map((comment, i) => (
              <li key={ comment.id } className={ `${ comment.type === RECOMMEND ? 'recommend_comment' : 'nonrecommend_comment' } ${ my_comment && i === 0 ? 'mine' : '' }` }>
                { comment.text }
              </li>
            ))
          }
        </ul>
      </div>
    </StyledLi>
  );
}
