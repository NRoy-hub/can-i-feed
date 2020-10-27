import React from 'react';

import profileEditIcon from 'resources/profile_edit.png';
import commentsIcon from 'resources/comments.png';
import logoutIcon from 'resources/logout.png';

import { color } from 'common';
import StyledUl from 'style/12_topbar/30_Menus';

export default function Menus(){
  return(
    <StyledUl color={ color }>
      <li>
        <img src={ profileEditIcon } alt="edit icon"/>
        <span>Edit</span>
      </li>
      <li>
        <img src={ commentsIcon } alt="comments icon"/>
        <span>Comments</span>
      </li>
      <li>
        <img src={ logoutIcon } alt="logout icon"/>
        <span>Logout</span>
      </li>
    </StyledUl>
  );
};