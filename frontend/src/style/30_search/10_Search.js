import styled, { css, keyframes } from 'styled-components';


export default styled.section`
  ${ ({ color }) => css`
    
    margin-top: 58px;
    display: flex;
    justify-content: center;

    .top_bar{
      position: fixed;
      top: 0;
      left: 0;
      background: white;
      box-shadow: 0 3px 2px rgba(0, 0, 0, 0.16);
    }

    .search_container{
      display: flex;
      flex-direction: column;
      width: 960px;

      .orders{
        display: flex;
        padding: 10px;
        padding-top: 30px;
        border-bottom: 1px solid #707070;
        .order{
          padding: 7px 10px;
          color: ${ color.light_grey2 };
          &:hover{ cursor: pointer; }
        }
        .order::before{
          width: 4px;
          height: 4px;
          display: inline-block;
          margin: 0 10px;
          margin-bottom: 3px;
          border-radius: 4px;
          background: ${ color.light_grey2 };
          content: '';
        }
        .order.selected{
          color: inherit;
          font-weight: bold;
          &:hover{ cursor: default; }
        }
        .order.selected::before{
          width: 7px;
          height: 7px;
          margin-bottom: 2px;
          background: ${ color.blue };
        }
      }

      .posts{
        padding: 20px 0;
        display: flex;
        flex-direction: column;

        .loading_container{
          position: relative;
          height: 60px;
        }
      }
    }

  `}
`;