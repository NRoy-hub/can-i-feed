import React from 'react';

import { color, speakOutType, url } from 'common';
import StyledUl from 'style/50_mypage/20_MyComments';
import { Link } from 'react-router-dom';

function Comment(){
  this.id = ''
  this.type = 1
  this.text = ''
  this.name = ''
  this.init = ({ id = '', type = 1, text = '', name = '' }) => {
    this.id = id
    this.type = type
    this.text = text
    this.name = name
  }
}

const comments = [...Array(10).keys()].map((_, i) => {
  const comment = new Comment()
  comment.init({ 
    id: `${i}`, 
    type: i % 2, 
    text: 'comment' + i, 
    name: '블루베리' + i 
  })
  return comment
});

export default function MyComments(){
  return(
    <StyledUl { ...{ color } }>
      { comments.map(comment => {
        const recommend = comment.type === speakOutType.RECOMMEND;
        return (
          <li className="comment" key={ comment.id }>
            <div className="detail">
              <Link className={ recommend ? 'like' : 'dislike' } to={ url.SEARCH() }>{ comment.name }</Link>
              <span>을(를) { recommend ? '좋아합니다' : '싫어합니다' }</span>
            </div>
            <div className="content">
              <span>{ comment.text }</span>
            </div>
            <div className="date">
              { '2020-11-02  07:11' }
            </div>
          </li>
        );
      }) }
    </StyledUl>
  );
}