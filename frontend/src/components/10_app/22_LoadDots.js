import React from 'react';
import StyledDiv from 'style/10_app/22_LoadDots';

import { color } from 'common';

export default function LoadDots(){
  return(
    <StyledDiv color={ color }>
      <ul className="dots">
        <li className="first_dot"></li>
        <li className="second_dot"></li>
        <li className="third_dot"></li>
      </ul>
    </StyledDiv>
  );
}