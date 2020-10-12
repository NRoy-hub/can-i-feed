import React, { useContext, useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { color, url, api, requestApi, DataContext, actionNames } from '../../common';

const RECOMMEND = 1;
const NONRECOMMEND = 2;
const CANCEL = 0;

export default function Post({ data, index }){
  const { id, photo, name, my_comment, recommend_count, nonrecommend_count, comments } = data;
  const history = useHistory();
  const { state: { user, posts }, dispatch } = useContext(DataContext);
  const [speakType, setSpeakType] = useState(null);
  const commentInput = useRef();

  useEffect(() => {
    requestApi({
      path: api.POST_COMMENT,
      data: { post_id: id },
      success: resData => dispatch({ 
        type: actionNames.modifyPost,
        index,
        post: { ...posts[index], ...resData }
      })
    });
    return () => {
      dispatch({ type: actionNames.initPost, posts: [] });
    }
  }, []);

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
    
  const commentList = my_comment ? [my_comment].concat(comments) : comments;

  return(
    <StyledLi>
      <div className="photo">
        <img src={ photo } alt="post_photo"/>
      </div>
      <div className="info">
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
        <ul className="comments">
          {
            commentList && commentList.map(comment => (
              <li key={ comment.id } className={ `${ comment.type === RECOMMEND ? 'recommend_comment' : 'nonrecommend_comment' }` }>
                { comment.text }
              </li>
            ))
          }
        </ul>
      </div>
    </StyledLi>
  );
}

const StyledLi = styled.li`
  display: flex;
  background: ${ color.blue3 };
  padding: 24px;
  &:first-child{
    margin-top: 30px;
  }
  &:not(:first-child){
    margin-top: 50px;
  }

  .photo{
    position: relative;
    width: 295px;
    height: 295px;
    background: ${ color.grey } ;
    & img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .info{
    margin-left: 50px;  
  }
  .title{
    font-size: 32px;
  }
  .status{
    position: relative;
    margin-top: 15px;
    display: flex;
    font-size: 24px;
    color: white;

    & > .state{
      background: ${ color.grey };
      padding: 9px 13px;

      &:hover{
        cursor: pointer;
      }
    }

    .recommend.active{
      background: ${ color.blue4 };
    }
    .nonrecommend{
        margin-left: 20px;
    }
    .nonrecommend.active{
      background: ${ color.red };
    }
  }

  .comment_input{
      position: absolute;
      box-sizing: border-box;
      left: 40px;
      top: 30px;
      width: 180px;
      display: flex;
      flex-direction: column;
      background: white;
      box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.5);
      border-radius: 5px;
      padding: 5px 10px;
      color: ${ color.black };
      font-size: 14px;

      &.good .comment_title{
        color: ${ color.blue2 };
      }
      &.bad .comment_title{
        color: ${ color.red };
      }
      .comment_title{
        font-weight: bold;
        margin-bottom: 6px;
      }

      & > input{
        box-sizing: border-box;
        width: 160px;
        margin-bottom: 5px;
        border: none;
        border-bottom: 1px solid ${ color.grey };
        outline: none;
        padding: 4px 0;
        font-size: 15px;
      }

      .comment_buttons{
        display: flex;
        
        & > *{
          flex: 1;
          padding: 5px 0;
          display: flex;
          justify-content: center;

          &:hover{
            cursor: pointer;
            background: #efefef;
          }
        }

        .comment_ok{
          color: ${ color.blue1 };
        }
        .comment_skip{
          color: ${ color.grey };
        }
      }
    }

  .comments{
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    font-size: 16px;

    & li{
      padding: 8px 13px;
      background: white;
      border-radius: 10px;
      border: 1px solid white;

      &:first-child{
        font-weight: bold;
      }
      &:not(:first-child){
        margin-left: 11px;
      }
      &.recommend_comment{
        border: 1px solid ${ color.blue4 };
      }
      &.nonrecommend_comment{
        border: 1px solid ${ color.red };
      }
    }
  }


`;