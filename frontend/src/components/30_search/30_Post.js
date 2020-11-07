import React, { useMemo, useRef, useState, useContext } from 'react';

import { color, DataContext, requestApi, api, actionNames, url, speakOutType } from 'common';
import StyledArticle from 'style/30_search/30_Post';
import HappyPuppyImage from 'resources/happy_puppy.jpg';
import AngryPuppyImage from 'resources/angry_puppy.jpg';
import HappyFaceImage from 'resources/happy_face.svg';
import AngryFaceImage from 'resources/angry_face.svg';
import ChatsImage from 'resources/chats_blue.png';
import { useHistory } from 'react-router-dom';
import CommentForm from './32_CommentForm';

export default function Post({ post, open, onClickOpen, index }){
  const { id, photo, name, recommend_count, nonrecommend_count, my_comment, comments } = post;
  const { state:{ user }, dispatch } = useContext(DataContext);
  const history = useHistory();
  const [speakType, setSpeakType] = useState(null);
  

  const { RECOMMEND, NONRECOMMEND } = speakOutType;

  const onClickActive = (type) => {
    if(!user)return history.push(url.LOGIN);
    if(my_comment && my_comment.type !== type){ return; }

    if(my_comment){
      dispatch.loadOn();
      requestApi({
        path: api.POST_RECANT,
        data: { post_id: id },
        success: (resData) => dispatch({ 
          type: actionNames.modifyPost, 
          index, 
          post: { ...post, my_comment: null, ...resData } }),
        fail: msg => {
          if(msg === 'void')
            alert('포스트가 존재하지 않습니다');
          else if(msg === 'conflict')
            alert('이미 나의 의견이 존재하지 않습니다');
        },
        common: dispatch.loadOff
      });
    }
    else setSpeakType(type); 
  }


  const { recommendComments, nonrecommendComments } = useMemo(() => {
    const recommendComments = [];
    const nonrecommendComments = [];
    comments.forEach(comment => {
      const correctComments = comment.type === 1 ? recommendComments : nonrecommendComments;
      !!comment.text && correctComments.push(comment.text);
    });
    return { recommendComments, nonrecommendComments };
  }, [my_comment, comments])

  const { myCommentType, myCommentText } = useMemo(() => ({ 
    myCommentType: my_comment && my_comment.type,
    myCommentText: my_comment && my_comment.text
  }), [my_comment]);
  
  return(
    <StyledArticle className={ open ? 'open' : '' } color={ color }>
      <div className="post_main">
        <div className="info">
          <img src={ `${ photo }` } alt="photo"/>
          <div className="name">
            <span>{ name }</span>
          </div>
        </div>
        <div className="feedback">
          <div className="current_state">
            <div className="state recommend_state">
              <img src={ HappyPuppyImage } alt="happy_puppy"/>
              <span>{ recommend_count }마리가 좋아합니다</span>
            </div>
            <div className="state nonrecommend_state">
              <img src={ AngryPuppyImage } alt="angry_puppy"/>
              <span>{ nonrecommend_count }마리가 싫어합니다</span>
            </div>
          </div>
          <div className="speak_out">
            <div 
              className={ `speak_out_button recommend_button ${ myCommentType === RECOMMEND ? 'selected' : '' }` } 
              onClick={ () => onClickActive(RECOMMEND) }
            >
              <img src={ HappyFaceImage } alt="happy_face"/>
            </div>
            <div 
              className={ `speak_out_button nonrecommend_button ${ myCommentType === NONRECOMMEND ? 'selected' : '' }` } 
              onClick={ () => onClickActive(NONRECOMMEND) }
            >
              <img src={ AngryFaceImage } alt="angry_face"/>
            </div>
            <div className="speak_out_button comments_button" onClick={ onClickOpen }>
              <img src={ ChatsImage } alt="chats"/>
            </div>
            { speakType && <CommentForm { ...{ post, index, speakType, setSpeakType } } /> }
          </div>
        </div>
      </div>
      <div className="comments_detail">
        <div className="recommend_comments">
          <div>
            <img src={ HappyFaceImage } alt="smile_face"/>
          </div>
          <ul className="comments">
            { (myCommentType !== RECOMMEND || !(!!myCommentText)) && 
                recommendComments.length === 0 && 
                  <li className="comment">코멘트가 없습니다</li> 
            }
            { myCommentType === RECOMMEND && !!my_comment.text && 
                <li className="comment mine">{ my_comment.text }</li> 
            }
            {
              recommendComments.map((comment, i) => 
                <li key={ id + '_reco_' + i } className="comment">{ comment }</li>
              )
            }
          </ul>
        </div>
        <div className="nonrecommend_comments">
          <div>
            <img src={ AngryFaceImage } alt="angry_face"/>
          </div>
          <ul className="comments">
            { (myCommentType !== NONRECOMMEND || !(!!myCommentText)) && 
                nonrecommendComments.length === 0 && 
                  <li className="comment">코멘트가 없습니다</li> 
            }
            { myCommentType === NONRECOMMEND && !!my_comment.text && 
                <li className="comment mine">{ my_comment.text }</li> 
            }
            {
              nonrecommendComments.map((comment, i) => 
                <li key={ id + '_nonreco_' + i } className="comment">{ comment }</li>
              )
            }
          </ul>
        </div>
      </div>
    </StyledArticle>
  );
} 