import React, { useMemo } from 'react';
import moment from 'moment';

import { color, speakOutType, url } from 'common';
import StyledLi from 'style/50_mypage/20_MyComment';
import { Link } from 'react-router-dom';

export default function MyComment({ comment }){
  const { id, type, text, name, update_time } = comment;
  const recommend = useMemo(() => type === speakOutType.RECOMMEND, [type]);
  const updateTime = useMemo(() => moment(update_time).format('YYYY-MM-DD  kk:mm'), [update_time]);
  return(
    <StyledLi { ...{ key: id, color } }>
      <div className="detail">
        <Link className={ recommend ? 'like' : 'dislike' } to={ url.SEARCH() }>{ name }</Link>
        <span>을(를) { recommend ? '좋아합니다' : '싫어합니다' }</span>
      </div>
      <div className="content">
        <span>{ text }</span>
      </div>
      <div className="time">
        { updateTime }
      </div>
    </StyledLi>
  );
}