import React, { useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { url } from 'common';
import StyledDiv from 'style/10_app/30_SearchBar';


export default function SearchBar({ className }){
  const { keyword } = useParams()
  const history = useHistory();
  const inputRef = useRef();

  const onKeyDown = (e) => {
    const { value } = inputRef.current;
    e.key === 'Enter' && !!value && history.push(url.SEARCH(value));
  }

  useEffect(() => {
    inputRef.current.value = keyword || '';
  }, [keyword])

  return(
    <StyledDiv className={ className }>
      <span>Can I feed my puppy</span>
      <input type="text" ref={ inputRef } onKeyDown={ onKeyDown } />
      <span>?</span>
    </StyledDiv>
  )
}
