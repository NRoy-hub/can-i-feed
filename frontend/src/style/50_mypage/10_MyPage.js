import styled, { css, keyframes } from 'styled-components';

const appearAnimation = keyframes`
  from{ opacity: 0; }
  to{ opacity: 1; }
`;

export default styled.article`
  ${ ({ color }) => css`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;

    .mypage_container{
      width: 400px;
      padding: 35px 0;
      display: flex;
      flex-direction: column;
      align-items: center;

      & > header{ font-size: 1.250em; }
      .info{ 
        width: 100%;
        padding-top: 25px; 
        display: flex;
        flex-direction: column;
        align-items: center;

        & input[type=file]{ display: none; }
      }

      .account_setting{
        width: 100%;
        height: 62px;
        margin-top: 23px;
        border: 1px solid ${ color.grey3 };
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .email{
          padding-left: 20px;
          font-size: 1em;
          label{
            margin-right: 25px;
            font-size: 0.875em;
            color: ${ color.grey2 };
          }
        }
        .delete_user{
          margin-right: 11px;
          padding: 7px 9px;
          font-size: 0.875em;
          color: ${ color.red };
          cursor: pointer;
        }
      }

      .my_comments{
        width: 100%;
        margin-top: 55px;
        display: flex;
        flex-direction: column;
        align-items: center;
        & > header{  color: ${ color.grey }; }
        .comments_list{
          width: 100%;
          padding-top: 30px;
          display: flex;
          flex-direction: column;
        }
        .more_button{
          margin-top: 11px;
          padding: 7px 14px;
          font-size: 0.875em;
          color: ${ color.light_grey2 };
          cursor: pointer;
        }
        .loading{
          width: 100%;
          height: 30px;
          padding-top: 20px;
          position: relative;
        }
      }
    }
  `}
`;