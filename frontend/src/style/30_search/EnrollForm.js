import styled from 'styled-components';
import { color } from '../../common';

export default styled.aside`
  .enroll_button{
    margin-top: 30px;
    text-align: center;

    & span{
      text-decoration: underline;
      &:hover{
        cursor: pointer;
      }
    }
  }

  .enroll_form{
    margin-top: 30px;
    border: 2px solid ${ color.blue };
    padding: 24px;
    display: flex;
  }

  .photo_box{
    position: relative;

    input[type=file]{
      position: absolute;
      opacity: 0;
    }
    label{
      width: 295px;
      height: 295px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #EFEFEF;
      background-size: cover;
      background-position: center;
      color: #AAAAAA;
      font-size: 25px;

      &:hover{
        cursor: pointer;
      }
    }
  }

  .info{
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    font-size: 16px;

    .title{
      font-size: 32px;
    }
    .status{
      margin-top: 30px;
      display: flex;
      font-size: 24px;
      color: white;

      & > *{
        background: ${ color.grey };
        padding: 9px 13px;
      }
      & > *:hover{
        cursor: pointer;
      }
      & > *:last-child{
        margin-left: 20px;
      }
    }
    .desc{ 
      margin-top: 15px;
      line-height: 25px;
    }
    .desc:first-of-type{ margin-top: 37px; }
    input[type=submit]{
      width: 148px;
      margin-top: 43px;
      padding: 10px 30px;
      background: ${ color.blue };
      border: none;
      outline: none;
      font-size: 22px;
      font-weight: bold;
      color: white;

      &:hover{
        cursor: pointer;
      }
    }
  }

  @media screen and (max-width: 1090px){
    .info{
      margin-left: 20px;
      justify-content: space-between;
    }
  }

  @media screen and (max-width: 720px){
    .enroll_button{
      margin-top: 20px;
      font-size: 15px;
    }
    .photo_box label{
      width: 160px;
      height: 160px;
    }
    .enroll_form{
      margin-top: 15px;
      padding: 12px;
    }
    .info{
      margin-left: 15px;

    }
    .info .title{
      font-size: 18px;
      font-weight: bold;
    }
    .info .desc{
      margin-top: 5px;
      line-height: 19px;
      font-size: 14px;
    }
    .info .desc:first-of-type{
      margin-top: 10px;
    }
    .info input[type=submit]{
      width: 92px;
      margin-top: 16px;
      padding: 7px 14px;
      font-size: 16px;
    }
  }
  @media screen and (max-width: 480px){
    .enroll_button{
      font-size: 14px;
      line-height: 20px;
    }
    .enroll_form{
      flex-direction: column;
      padding: 20px;
    }
    .photo_box label{
      width: calc(100vw - (30px * 2));
      height: calc(100vw - (30px * 2));
    }
    .info{
      margin: 0;
      margin-top: 12px;

      .title{
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 20px;
        text-align: center;
      }
      .desc{
        text-align: center;
      }
      .desc:first-of-type{
        margin-top: 15px;
      }
      .enroll_button{
        width: 100%;
      }
      input[type=submit]{
        width: 100%;
      }
    }
  }
`;