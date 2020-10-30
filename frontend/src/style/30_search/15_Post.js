import styled, { css } from 'styled-components';

export default styled.li`
  ${ ({ color }) => css`
    display: flex;
    flex-direction: column;
    padding: 20px 24px;
    border-bottom: 1px solid #e5e5e5;

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
          margin-left: 30px;
          display: flex;
          align-items: center;

          & > *{ 
            width: 32px;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 20px; 
          }
          & > *:hover{ cursor: pointer; }
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