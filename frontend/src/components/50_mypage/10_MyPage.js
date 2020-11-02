import React from 'react';

import { color } from 'common';
import StyledSection from 'style/50_mypage/10_MyPage';
export default function MyPage(){
  return(
    <StyledSection {...{ color }}>
      Mypage
    </StyledSection>
  );
}