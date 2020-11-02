import React from 'react';

import { color } from 'common';
import StyledUl from 'style/50_mypage/20_MyComments';
export default function MyComments(){
  return(
    <StyledUl { ...{ color } }>
      MyComments
    </StyledUl>
  );
}