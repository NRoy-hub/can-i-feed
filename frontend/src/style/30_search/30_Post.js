import styled, { css, keyframes } from 'styled-components';

const dropAnimation = keyframes`
  from{
    transform: translateY(-5px);
    opacity: 0;
  }
  to{
    transform: translateY(0);
    opacity: 1;
  }
`;

const buttonHoverAnimation = (backgroundColor) => keyframes`
  from{ background: white; }
  to{ background: ${ backgroundColor }; }
`;

const commentFormStyle = (color) => css`
  .comment_form{
    position: absolute;
    left: -45px;
    top: 60%;
    box-sizing: border-box;
    width: 160px;
    padding: 5px 10px 8px 10px;
    background: white;
    border: 1px solid ${ color.grey3 };
    border-radius: 5px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
    font-size: 14px;

    animation: ${ dropAnimation } 0.2s ease-in-out;

    .recommend_header{ color: ${ color.green }; }
    .nonrecommend_header{ color: ${ color.red }; }
    input[type=text]{
      box-sizing: border-box;
      width: 100%;
      margin-top: 8px;
      font-size: 14px;
      padding: 3px 2px;
      border: none;
      outline: none;
      border-bottom: 1px solid ${ color.grey4 };
    }
    .comment_form_buttons{
      margin-top: 6px;
      display: flex;
      justify-content: space-between;
      .comment_button{
        padding: 5px 19px;
        &:hover{ 
          cursor: pointer; 
          animation: ${ buttonHoverAnimation(color.light_grey) } .1s ease-in-out;
          background: ${ color.light_grey };
        }
      }
      .comment_cancel{ color: ${ color.grey2 }; }
    }
  }
`;

export default styled.li`
  ${ ({ color }) => css`
    display: flex;
    flex-direction: column;
    padding: 20px 24px;
    border-bottom: 1px solid #e5e5e5;
    animation: ${ dropAnimation } 0.5s ease-in-out;
    

    .post_main{
      height: 128px;
      display: flex;
      justify-content: space-between;

      .info{
        display: flex;
        align-items: center;

        img{
          width: 100px;
          height: 88px;
          background: ${ color.light_grey };
        }
        .name{
          font-weight: bold;
          margin-left: 25px;
        }
      }
      .feedback{
        display: flex;
        .current_state{
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 14px;

          .state{
            display: flex;
            align-items: center;

            &:first-child{ margin-bottom: 5px; }
          }
          img{
            width: 30px;
            height: 30px;
            margin-right: 5px;
            border-radius: 15px;
            border: 1px solid ${ color.light_grey };
          }
        }
        .speak_out{
          position: relative;
          margin-left: 30px;
          display: flex;
          align-items: center;

          .speak_out_button{ 
            width: 32px;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 20px; 
          }
          .speak_out_button:hover{ cursor: pointer; }
          .recommend_button.selected{ 
            background: ${ color.green }; 
            img{ filter: brightness(0) invert(1); }
          }
          .nonrecommend_button.selected{ 
            background: ${ color.red }; 
            img{ filter: brightness(0) invert(1); }
          }

          .comments_button{
            margin-left: 20px;
            filter: grayscale(100%);
          }
          ${ commentFormStyle(color) }
        }
      }
    }

    .comments_detail{
      display: none;
    }
    &.open{
      background: #EBEFF8;
      border-bottom: 1px solid #EBEFF8;

      .feedback .speak_out .comments_button{
        filter: none;
      }
      .comments_detail{
        display: flex;
        flex-direction: column;

        & > *{
          display: flex;
        }
        .comments{
          margin-left: 10px;
          display: flex;
          flex-wrap: wrap;
          font-size: 14px;
        }
        .nonrecommend_comments{
          margin-top: 15px;
        }
        .comment{
          padding: 4px 6px;
          background: white;
          border-radius: 3px;
          border: 1px solid ${ color.light_grey };
          margin-right: 10px;
          margin-bottom: 8px;

          &.mine{ font-weight: bold; }
        }
      }
    }

    
  `}
`;