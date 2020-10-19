import styled from 'styled-components';
import { color } from '../../common';


export default styled.li`
  display: flex;
  background: ${ color.blue3 };
  padding: 24px;
  &:first-child{
    margin-top: 30px;
  }
  &:not(:first-child){
    margin-top: 50px;
  }

  .photo{
    position: relative;
    width: 295px;
    height: 295px;
    background: ${ color.grey } ;
    & img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .info{
    margin-left: 50px;  
  }
  .title{
    font-size: 32px;
  }
  .status{
    position: relative;
    margin-top: 15px;
    display: flex;
    font-size: 24px;
    color: white;

    & > .state{
      background: ${ color.grey };
      padding: 9px 13px;

      &:hover{
        cursor: pointer;
      }
    }

    .recommend.active{
      background: ${ color.blue4 };
    }
    .nonrecommend{
        margin-left: 20px;
    }
    .nonrecommend.active{
      background: ${ color.red };
    }
  }

  .comment_input{
      position: absolute;
      box-sizing: border-box;
      left: 40px;
      top: 30px;
      width: 180px;
      display: flex;
      flex-direction: column;
      background: white;
      box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.5);
      border-radius: 5px;
      padding: 5px 10px;
      color: ${ color.black };
      font-size: 14px;

      &.good .comment_title{
        color: ${ color.blue2 };
      }
      &.bad .comment_title{
        color: ${ color.red };
      }
      .comment_title{
        font-weight: bold;
        margin-bottom: 6px;
      }

      & > input{
        box-sizing: border-box;
        width: 160px;
        margin-bottom: 5px;
        border: none;
        border-bottom: 1px solid ${ color.grey };
        outline: none;
        padding: 4px 0;
        font-size: 15px;
      }

      .comment_buttons{
        display: flex;
        
        & > *{
          flex: 1;
          padding: 5px 0;
          display: flex;
          justify-content: center;

          &:hover{
            cursor: pointer;
            background: #efefef;
          }
        }

        .comment_ok{
          color: ${ color.blue1 };
        }
        .comment_skip{
          color: ${ color.grey };
        }
      }
    }

  .comments{
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    font-size: 16px;

    & li{
      padding: 8px 13px;
      background: white;
      border-radius: 10px;
      border: 1px solid white;

      &.mine{
        font-weight: bold;
      }
      &:not(:first-child){
        margin-left: 11px;
      }
      &.recommend_comment{
        border: 1px solid ${ color.blue4 };
      }
      &.nonrecommend_comment{
        border: 1px solid ${ color.red };
      }
    }
  }
`;