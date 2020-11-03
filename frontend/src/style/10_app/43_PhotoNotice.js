import styled, { css } from 'styled-components';

export default styled.article`
  ${ ({ color }) => css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.08);
    z-index: 10;

    .notice_container{
      width: 300px;
      background: white;
      border: 1px solid ${ color.grey2 };
      border-radius: 8px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 19px 0;
      font-size: 14px;

      header{ 
        margin-bottom: 10px;
        font-size: 20px; 
      }
      .desc-1{ 
        margin-top: 16px; 
        text-align: center;
        line-height: 20px;
      }
      .desc-2{
        margin-top: 12px;
        color: ${ color. grey };
      }
      .close_button{
        margin-top: 16px;
        padding: 7px 26px;
        border-radius: 5px;
        background: ${ color.grey4 };
        font-size: 16px;
        color: white;
        cursor: pointer;
      }
    }
  `}
`;