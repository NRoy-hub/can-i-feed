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


export default styled.article`
  ${ ({ color }) => css`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 20px 24px;
    border-bottom: 1px solid #e5e5e5;
    animation: ${ dropAnimation } 0.5s ease-in-out;
    
    .photo{
      width: 100px;
      height: 88px;
      background: ${ color.light_grey };
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .post_main{
      box-sizing: border-box;
      height: 128px;
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .name{
        flex: 1;
        margin-left: 25px;
        font-weight: bold;
        font-size: 16px;
      }
      .feedback{
        display: flex;
        .current_state{
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 0.875em;

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

          figure{
            display: flex;
            align-items: center;
            &:last-of-type{ margin-left: 5px; }
          }
          figure.selected .recommend_button{
            background: ${ color.green }; 
            img{ filter: brightness(0) invert(1); }
          }
          figure.selected .nonrecommend_button{
            background: ${ color.red }; 
            img{ filter: brightness(0) invert(1); }
          }
          .speak_out_button{ 
            width: 32px;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 20px; 
          }
          button:hover{ cursor: pointer; }
          .recommend_button.selected{ 
            background: ${ color.green }; 
            img{ filter: brightness(0) invert(1); }
          }
          .nonrecommend_button.selected{ 
            background: ${ color.red }; 
            img{ filter: brightness(0) invert(1); }
          }
          figcaption{
            margin-left: 4px;
            font-size: 14px;
            font-weight: bold;
            color: ${ color.grey };
            display: none;
          }

          .comments_button{
            margin-left: 20px;
            filter: grayscale(100%);
          }
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
        width: 100%;
        & > *{
          display: flex;
        }
        .comments{
          margin-left: 10px;
          display: flex;
          flex-wrap: wrap;
          font-size: 0.875em;
        }
        .nonrecommend_comments{
          margin-top: 15px;
        }
        .no_comment{
          padding: 6px 3px;
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