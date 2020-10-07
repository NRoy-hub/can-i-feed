import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { color, url, requestApi, DataContext, actionNames } from '../../common';

const RECOMMEND = 1;
const NONRECOMMEND = 0;
const CANCEL = -1;

export default function Post({ data, index }){
  const history = useHistory();
  const { state: { user, posts }, dispatch } = useContext(DataContext);
  const { photo, title, my_comment, recommend_count, nonrecommend_count, comments } = data;
  
  const onClick = type => {
    if(!user){ return history.push(url.LOGIN); }
    if(my_comment && my_comment.type !== type){ return; }

    let newType = my_comment ? CANCEL : type;
    dispatch.loadOn();
    requestApi({
      method: 'POST',
      path: '/speak_out',
      data: { type: newType },
      success: resData => {
        const newPost = { ...posts[index], my_comment: resData.my_comment }
        dispatch({ type: actionNames.modifyPost, post: newPost })
      },
      common: dispatch.loadOff
    });
  };
    
  const commentList = my_comment ? [my_comment].concat(comments) : comments;

  return(
    <StyledLi>
      <div className="photo">
        <img src={ photo } alt="post_photo"/>
      </div>
      <div className="info">
        <div className="title">{ title }</div>
        <div className="status">
          <div 
            className={ `recommend ${ my_comment && my_comment.type === RECOMMEND ? 'active' : '' }` }
            onClick={ () => onClick(RECOMMEND) }>
              좋아요 { recommend_count }
          </div>
          <div 
            className={ `nonrecommend ${ my_comment && my_comment.type === NONRECOMMEND ? 'active' : '' }` }
            onClick={ () => onClick(NONRECOMMEND)}>
              나빠요 { nonrecommend_count }
          </div>
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
    margin-top: 15px;
    display: flex;
    font-size: 24px;
    color: white;

    & > *{
      background: ${ color.grey };
      padding: 9px 13px;

      &:last-child{
        margin-left: 20px;
      }
      &:hover{
        cursor: pointer;
      }
    }

    .recommend.active{
      background: ${ color.blue4 };
    }
    .nonrecommend.active{
      background: ${ color.red };
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