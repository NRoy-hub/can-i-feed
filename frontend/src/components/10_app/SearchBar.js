import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { DataContext, color, url } from '../../common';


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

const StyledDiv = styled.div`
  height: 120px;
  margin-top: 20px;
  background: ${ color.blue2 };
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  color: white;

  .inner_box{
    display: flex;
    align-items: flex-end;
  }

  input[type=text]{
    width: 350px;
    margin-left: 20px;
    margin-right: 5px;
    background: inherit;
    outline: none;
    border: none;
    border-bottom: 2px solid white;
    padding-bottom: 4px;
    transform: translateY(3px);
    text-align: center;
    font-size: 25px;
    color: white;
  }

  .option{
    margin-left: 25px;
    padding-bottom: 5px;
    opacity: 0.85;
    font-size: 20px;
  }

  @media screen and (max-width: 1090px){
    input[type=text]{
      width: 270px;
    }
  }
`;