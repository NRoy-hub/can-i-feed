import styled, { css } from 'styled-components';

import keywordBoardBasic from './60_keyword_board_basic';


export default styled.section`
  ${ ({ color }) => {
    return css`
      position: relative;
      box-sizing: border-box;
      height: 100vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;

      .cover{
        width: 400px;
        height: 267px;
        margin-bottom: 54px;
        & img{
          width: 100%;
          height: 100%;
        }
      }
      .active_button{
        margin-top: 50px;
        padding: 10px 14px;
        font-size: 14px;
        color: #6B6B6B;

        &:hover{
          cursor: pointer;
          text-decoration: underline;
        }
      }
      .keyword_board{
        ${ keywordBoardBasic({ color }) }
      }
    `}
  }
`;