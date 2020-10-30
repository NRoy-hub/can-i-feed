import React, { useMemo } from 'react';

import { color } from 'common';
import StyledLi from 'style/30_search/15_Post';
import HappyPuppyImage from 'resources/happy_puppy.jpg';
import AngryPuppyImage from 'resources/angry_puppy.jpg';
import HappyFaceImage from 'resources/happy_face.svg';
import AngryFaceImage from 'resources/angry_face.svg';
import ChatsImage from 'resources/chats_blue.png';

export default function Post({ post }){
  const { id, photo, name, recommend_count, nonrecommend_count, my_comment, comments } = post;

  const { recommendComments, nonrecommendComments } = useMemo(() => {
    const recommendComments = [];
    const nonrecommendComments = [];

    const pushToCorrectComments = (comment) => {
      const correctComments = comment.type === 1 ? recommendComments : nonrecommendComments;
      correctComments.push(comment.text);
    }
    comments.forEach(comment => pushToCorrectComments(comment));

    return { recommendComments, nonrecommendComments };
  }, [my_comment, comments])

  return(
    <StyledLi className="open" color={ color }>
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
            <div className="recommend_button">
              <img src={ HappyFaceImage } alt="happy_face"/>
            </div>
            <div className="nonrecommend_button selected">
              <img src={ AngryFaceImage } alt="angry_face"/>
            </div>
            <div className="comments_button">
              <img src={ ChatsImage } alt="chats"/>
            </div>
          </div>
        </div>
      </div>
      <div className="comments_detail">
        <div className="recommend_comments">
          <div>
            <img src={ HappyFaceImage } alt="smile_face"/>
          </div>
          <ul className="comments">
            { recommendComments.length === 0 && <li className="comment">코멘트가 없습니다</li> }
            { my_comment.type === 1 && <li className="comment mine">{ my_comment.text }</li> }
            {
              recommendComments.map((comment, i) => <li className="comment">{ comment }</li>)
            }
          </ul>
        </div>
        <div className="nonrecommend_comments">
          <div>
            <img src={ AngryFaceImage } alt="angry_face"/>
          </div>
          <ul className="comments">
            { nonrecommendComments.length === 0 && <li className="comment">코멘트가 없습니다</li> }
            { my_comment.type === 2 && <li className="comment mine">{ my_comment.text }</li> }
            {
              nonrecommendComments.map(comment => <li className="comment">{ comment }</li>)
            }
          </ul>
        </div>
      </div>
    </StyledLi>
  );
} 