import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { DataContext, url } from '../../common';
import StyledDiv from './SearchBar.styled';


export default function SearchBar({ inputRef }){
  const history = useHistory();
  const { state: { searchInput } } = useContext(DataContext);

  const onKeyDown = (e) => {
    const { value } = inputRef.current;
    e.key === 'Enter' && !!value && history.push(url.SEARCH(value));
  }

  useEffect(() => {
    const { value } = inputRef.current;
    if(searchInput !== value){
      inputRef.current.value = searchInput;
    }
  }, [searchInput, inputRef]);
  
  
  return(
    <StyledDiv>
      <div className="inner_box">
        <span>Can I Feed</span>
        <input type="text" ref={ inputRef } onKeyDown={ onKeyDown }/>
        <span>?</span>
        <span className="option">to puppy</span>
      </div>
    </StyledDiv>
  )
}
