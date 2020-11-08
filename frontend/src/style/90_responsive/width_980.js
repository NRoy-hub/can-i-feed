import { css } from 'styled-components';

export default css`
  @media screen and (max-width: 980px){
    .top_bar{
      min-width: inherit;
    }
    .keyword_board{
      width: 95%;
      left: 2.5%;
    }
    .search{
      box-sizing: border-box;
      padding: 0 8px;
      .search_container{
        width: 100%;
      }
    }
  }
`;
