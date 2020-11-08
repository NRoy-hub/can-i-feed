import { css, keyframes } from 'styled-components';

export default (color) => css`
  @media screen and (max-width: 768px){
    font-size: 0.875em;
    .top_bar{
      padding: 6px 20px;
      flex-wrap: wrap;
      
      .search_bar{
        width: 100%;
        order: 2;
        padding-top: 5px;
        padding-bottom: 5px;
        justify-content: center;

        input{
          margin: 0 5px;
        }
      }
    }
    .home .keyword_board{
      padding-top: 40px;
      .close_button{
        padding: 5px;
        img{ 
          width: 14px; 
          height: 14px;
        }
      }
      .tabs{ gap: 10px; }
      .ranking{ 
        margin-left: 0;
        margin-top: 5px;
      }
      .keywords{ 
        margin-top: 15px;
        padding: 0 10px; 
      }
    }
    .search{
      margin-top: 80px;
      .orders{
        padding: 30px 0 10px 0;
      }
      .posts{
        gap: 20px;
        align-items: center;
      }
      .post{
        position: relative;
        width: 420px;
        height: 380px;
        padding: 0;
        border: none;
        border-radius: 5px;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);

        .photo{
          position: absolute;
          top: 0;
          left: 0;
          width: 420px;
          height: 380px;
          border-radius: 5px;
          overflow: hidden;
          z-index: -1;
        }
        .post_main{
          position: absolute;
          left: 0;
          bottom: 0;
          display: initial;
          width: 100%;
          height: 88px;
          background: rgba(255, 255, 255, 0.9);
          padding: 10px 8px 0 13px;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          .name{
            margin-left: 0;
          }
          .feedback{
            position: relative;
            .current_state{ display: none; }
            .speak_out{
              width: 100%;
              margin-left: 0;
              margin-top: 16px;
              figure:last-of-type{
                margin-left: 10px;
              }
              figcaption{
                display: initial;
              }
              .comments_button{
                position: absolute;
                right: 0;
                top: 0;
              }
            }
            .comment_form{
              left: 25px;
            }
          }
        }
        &.open{
          height: auto;
          padding-top: 380px;
          background: none;
          display: flex;
          flex-direction: column;
          align-items: initial;
          .photo{
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }
          .post_main{
            position: initial;
            animation: ${ moveAnimation } 0.2s linear;
          }
          .comments_detail{
            margin: 15px 0;
            animation: ${ moveAnimation } 0.2s linear, ${ appearAnimation } 0.2s linear;

            .comments_icon{
              display: none;
            }

            .recommend_comments .comment{
              border-color: ${ color.green };
            }
            .nonrecommend_comments{
              margin-top: 13px;

              .comment{
                border-color: ${ color.red };
              }
            }
          }
        }
      }
    }
    .login_frame{
      width: inherit;
      padding: 30px 40px;
      margin: 0;

      input[type=text], .input_box{
        width: 250px;
      }
    }
  }
`;

const moveAnimation = keyframes`
  from{ transform: translateY(-88px); }
  to{ transform: translateY(0); }
`;
const appearAnimation = keyframes`
  from{ opacity: 0; }
  to{ opacity: 1; }
`;
