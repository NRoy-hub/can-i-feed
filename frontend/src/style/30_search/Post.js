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
    box-sizing: border-box;
    width: 295px;
    height: 295px;
    flex-shrink: 0;
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

    .state_icon{
      display: none;
      flex-direction: column;
      align-items: center;
      transform: translateY(-8px);

      &.recommend_icon{
        margin-right: 20px;
        &.active .icon_box{
          background: ${ color.blue2 }
        }
        &.active .icon_box img{
          filter: brightness(0) invert(1);
        }
      }

      &.nonrecommend_icon.active{
        .icon_box{
          background: ${ color.red };
        }
        .icon_box img{
          filter: brightness(0) invert(1);
        }
      }

      .icon_number{
        font-size: 14px;
        color: #636363;
        font-weight: bold;
      }
      .icon_box{
        width: 42px;
        height: 42px;
        margin-top: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;

        &:hover{
          cursor: pointer;
        }
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
          color: ${ color.blue };
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
      margin-right: 10px;
      margin-bottom: 8px;
      padding: 8px 13px;
      background: white;
      border-radius: 10px;
      border: 1px solid white;
      &.mine{
        font-weight: bold;
      }
      &.recommend_comment{
        border: 1px solid ${ color.blue4 };
      }
      &.nonrecommend_comment{
        border: 1px solid ${ color.red };
      }
    }
  }

  @media screen and (max-width: 1090px){
    .info{ 
      width: 100%;
      margin-left: 25px;
    }
    .info_top{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .status{
        margin: 0;
        .state{
          display: none;
        }
        .state_icon{
          display: flex;
        }
      }
    }
    .comment_input{
      left: -90px;
    }
  }
  @media screen and (max-width: 720px){
    padding: 12px;
    .photo{
      width: 160px;
      height: 160px;
    }
    .info_top{
      flex-direction: column;
      align-items: flex-start;

      .title{
        font-size: 18px;
        font-weight: bold;
      }
      .status{
        margin-top: 5px;
      }
      .status .state_icon{
        flex-direction: row;
        transform: none;
      }
      .status .state_icon.recommend_icon{
        margin-right: 10px;
      }
      .status .state_icon .icon_box{
        width: 28px;
        height: 28px;
        margin-right: 3px;
        order: -1;
        img{
          width: 17px;
          height: 18px;
        }
      }
    }
    .comments{
      margin-top: 10px;
      font-size: 14px;
      li{
        padding: 5px 7px;
        margin-right: 5px;
      }
    }
  }
  @media screen and (max-width: 480px){
    flex-direction: column;
    padding: 20px;
    .photo{
      width: calc(100vw - (30px * 2));
      height: calc(100vw - (30px * 2));
    }
    .info{ margin: 0; }
    .info_top{
        margin-top: 12px;
      .state_icon{
        transform: translateY(-7px);
      } 
    }
    .comment_input{
      left: 0px;
      top: -70px;
      /* height: 75px; */
    }
  }
`;