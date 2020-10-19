import styled from 'styled-components';
import { color } from '../../common';

export default styled.aside`
    .enroll_button{
    padding-top: 30px;
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
    border: 2px solid ${ color.blue1 };
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
    .desc{ margin-top: 15px; }
    .desc:first-of-type{ margin-top: 37px; }
    input[type=submit]{
      width: 148px;
      margin-top: 43px;
      padding: 10px 30px;
      background: ${ color.blue1 };
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
`;