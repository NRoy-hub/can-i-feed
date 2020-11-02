import React, { useContext, useEffect, useRef } from 'react';

import { DataContext, requestApi, api, actionNames, speakOutType, didClickeOutside, color } from 'common';
import StyledForm from 'style/30_search/32_CommentForm';

export default function CommentForm(props){
  const { post, index, speakType, setSpeakType } = props;
  const { dispatch } = useContext(DataContext);
  const formRef = useRef();
  const commentInputRef = useRef();
  const { RECOMMEND } = speakOutType;

  const onSubmit = e => {
    e.preventDefault();
    if(!speakType)return;
    const text = commentInputRef.current.value.slice(0, 10);
    dispatch.loadOn();
    requestApi({
      path: api.POST_SPEAK_OUT,
      data: { post_id: post.id, type: speakType, text },
      success: resData => {
        const newPost = { ...post, ...resData }
        dispatch({ type: actionNames.modifyPost, index, post: newPost })
      },
      fail: msg => {
        if(msg === 'void')
          alert('포스트가 존재하지 않습니다');
        else if(msg === 'conflict')
          alert('이미 의견을 내었습니다');
      },
      common: () => {
        commentInputRef.current.value = '';
        setSpeakType(null);
        dispatch.loadOff();
      }
    });
  }

  const onKeyPress = e => e.key === 'Enter' && onSubmit(e);

  useEffect(() => {
    const onClick = e => {
      didClickeOutside(e, formRef.current) && setSpeakType(null);
    };
    document.addEventListener('click', onClick);
    commentInputRef.current.focus();
    return () => document.removeEventListener('click', onClick);
  }, [])

  return(
    <StyledForm { ...{ key: speakType, ref: formRef, color, onSubmit } }>
      <header className={ speakType === RECOMMEND ? 'recommend_header' : 'nonrecommend_header' }>
        { speakType === RECOMMEND ? '좋아요' : '싫어요' }
      </header>
      <input type="text" ref={ commentInputRef } placeholder="10자 이내 작성가능" maxLength={ 10 } onKeyPress={ onKeyPress } />
      <div className="comment_form_buttons">
        <button className="comment_button comment_submit">
          <span>작성</span>
        </button>
        <div className="comment_button comment_cancel" onClick={ () => setSpeakType(null) }>
          <span>취소</span>
        </div>
      </div>
    </StyledForm>
  );
}