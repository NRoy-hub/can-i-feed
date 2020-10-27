import React, { useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { DataContext, url } from 'common';
import StyledDiv from 'style/12_topbar/SearchBar';


export default function SearchBar(){
  const history = useHistory();
  const { state: { searchInput } } = useContext(DataContext);
  const inputRef = useRef();

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
  
  
  // const pre = (
  //   <StyledDiv>
  //     <div className="inner_box">
  //       <span>Can I Feed</span>
  //       <input type="text" ref={ inputRef } onKeyDown={ onKeyDown }/>
  //       <span>?</span>
  //       <span className="option">to puppy</span>
  //     </div>
  //   </StyledDiv>
  // )

  return(
    <StyledDiv className="search_bar">
      <span>Can I feed my puppy</span>
      <input type="text" ref={ inputRef } onKeyDown={ onKeyDown } />
      <span>?</span>
    </StyledDiv>
  )
}
