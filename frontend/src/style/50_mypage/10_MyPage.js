import styled, { css, keyframes } from 'styled-components';

const appearAnimation = keyframes`
  from{ opacity: 0; }
  to{ opacity: 1; }
`;

export default styled.section`
  ${ ({ color }) => css`
    width: 100vw;
    display: flex;
    justify-content: center;

    .mypage_container{
      width: 400px;
      padding: 35px 0;
      display: flex;
      flex-direction: column;
      align-items: center;

      & > header{ font-size: 20px; }
      .info{ 
        width: 100%;
        padding-top: 25px; 
        display: flex;
        flex-direction: column;
        align-items: center;

        & input[type=file]{ display: none; }
      }

      .profile_photo{
        position: relative;
        box-sizing: border-box;
        width: 96px;
        height: 96px;
        overflow: hidden;
        border: 1px solid #DADADA;
        border-radius: 48px;
        cursor: pointer;

        &:hover .hover_camera{
          animation: ${ appearAnimation } .1s ease-in-out;
        }

        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .hover_camera{
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 30px;
          background: rgba(112, 112, 112, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          img{ 
            width: 16px;
            height: 14px;
          }
        }
        &:hover .hover_camera{
          opacity: 1;
        }
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
          font-size: 16px;
          label{
            margin-right: 25px;
            font-size: 14px;
            color: ${ color.grey2 };
          }
        }
        .delete_user{
          margin-right: 11px;
          padding: 7px 9px;
          font-size: 14px;
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
        .more_button{
          margin-top: 11px;
          padding: 7px 14px;
          font-size: 14px;
          color: ${ color.light_grey2 };
          cursor: pointer;
        }
        .loading{
          width: 100%;
          height: 100px;
          position: relative;
        }
      }
    }
  `}
`;