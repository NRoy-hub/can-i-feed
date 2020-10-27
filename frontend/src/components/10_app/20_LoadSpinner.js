import React from 'react';
import loadingGif from 'resources/loading.gif';
import StyledDiv from 'style/10_app/20_LoadSpinner';

export default function LoadSpinner(){
  return(
    <StyledDiv>
      <img src={ loadingGif } alt="load_spinner"/>
    </StyledDiv>
  );
}